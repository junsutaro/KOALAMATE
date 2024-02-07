package com.ssafy.koala.service;

import com.ssafy.koala.dto.CommentDto;
import com.ssafy.koala.dto.board.BoardDto;
import com.ssafy.koala.dto.board.CreateBoardRequestDto;
import com.ssafy.koala.dto.board.ViewBoardResponseDto;
import com.ssafy.koala.dto.cocktail.CocktailWithDrinkDto;
import com.ssafy.koala.dto.drink.DrinkWithoutCocktailDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.CocktailModel;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.model.LikeModel;
import com.ssafy.koala.model.user.UserModel;
import com.ssafy.koala.repository.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {

	private final BoardRepository boardRepository;
	private final DrinkRepository drinkRepository;
	private final CocktailRepository cocktailRepository;
	private final LikeRepository likeRepository;

	private final Path fileStorageLocation;
	public BoardService(BoardRepository boardRepository, DrinkRepository drinkRepository, CocktailRepository cocktailRepository,
                        LikeRepository likeRepository) {
		this.boardRepository = boardRepository;
		this.drinkRepository = drinkRepository;
		this.cocktailRepository = cocktailRepository;
		this.likeRepository = likeRepository;


		this.fileStorageLocation = Paths.get("frontend/public/BoardFileUploads").toAbsolutePath().normalize();
		try {
			Files.createDirectories(this.fileStorageLocation); // 디렉토리가 없다면 생성
		} catch (Exception ex) {
			throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
		}
	}
	public List<BoardDto> getAllEntities() {
		List<BoardModel> entities = boardRepository.findAll();
		return entities.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	public Page<ViewBoardResponseDto> getPageEntities(int page, int size, int option) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);

		Page<BoardModel> entities;
		switch(option) {
			case 1: entities = boardRepository.findAll(pageable); break;    //전체
			case 2: entities = boardRepository.findByNickname("admin",pageable); break;  //관리자
			default: entities = boardRepository.findUserBoard(pageable);   //유저
		}


		List<ViewBoardResponseDto> result = entities.getContent().stream()
				.map(board -> {
					ViewBoardResponseDto boardDto = new ViewBoardResponseDto();
					if (board != null) { // BoardModel이 null이 아닌지 확인
						BeanUtils.copyProperties(board, boardDto);

						List<CocktailWithDrinkDto> cocktails = board.getCocktails() != null ? board.getCocktails().stream()
								.map(cocktail -> {
									CocktailWithDrinkDto cocktailDto = new CocktailWithDrinkDto();
									if (cocktail != null && cocktail.getDrink() != null) { // cocktail과 drink가 null이 아닌지 확인
										BeanUtils.copyProperties(cocktail, cocktailDto);
										DrinkWithoutCocktailDto drinkDto = new DrinkWithoutCocktailDto();
										BeanUtils.copyProperties(cocktail.getDrink(), drinkDto);
										cocktailDto.setDrink(drinkDto);
									}
									return cocktailDto;
								})
								.collect(Collectors.toList()) : Collections.emptyList();

						List<CommentDto> comments = board.getComments() != null ? board.getComments().stream()
								.map(comment -> {
									CommentDto commentDto = new CommentDto();
									if (comment != null) { // comment가 null이 아닌지 확인
										BeanUtils.copyProperties(comment, commentDto);
									}
									return commentDto;
								})
								.collect(Collectors.toList()) : Collections.emptyList();

						boardDto.setCocktails(cocktails);
						boardDto.setComments(comments);
					}
					return boardDto;
				})
				.collect(Collectors.toList());

		return new PageImpl<>(result, pageable, entities.getTotalElements());
	}

	public BoardDto getBoardDtoById(Long id) {
		BoardModel board = boardRepository.findById(id).orElse(null);
		return (board != null) ? convertToDto(board) : null;
	}

	public ViewBoardResponseDto getBoardById(Long id, Long userId) {
		BoardModel board = boardRepository.findById(id).orElse(null);

		if (board != null) {
			ViewBoardResponseDto boardDto = new ViewBoardResponseDto();
			BeanUtils.copyProperties(board, boardDto);

			// 현재 유저가 게시글 좋아요 했는지 확인
			UserModel user = new UserModel();
			user.setId(userId);
			boolean isLike = likeRepository.existsByUserAndBoard(user, board);
			boardDto.setLiked(isLike);

			// 좋아요 수 확인
			long likeCount = likeRepository.countByBoard_Id(id);
			boardDto.setLikeCount(likeCount);


			List<CocktailWithDrinkDto> list = board.getCocktails().stream()
					.map(temp -> {
						CocktailWithDrinkDto insert = new CocktailWithDrinkDto();
						BeanUtils.copyProperties(temp, insert);

						DrinkWithoutCocktailDto drinkDto = new DrinkWithoutCocktailDto();
						BeanUtils.copyProperties(temp.getDrink(), drinkDto);

						insert.setDrink(drinkDto);
						return insert;
					})
					.collect(Collectors.toList());

			boardDto.setCocktails(list);
			List<CommentDto> comments = board.getComments().stream()
					.map(temp-> {
						CommentDto insert = new CommentDto();
						BeanUtils.copyProperties(temp, insert);
						return insert;
					}).collect(Collectors.toList());
			boardDto.setComments(comments);
			return boardDto;
		}

		return null;
	}

	public BoardDto createBoard(BoardModel boardModel) {
		//모자란 부분 추가
		BoardModel savedBoard = boardRepository.save(boardModel);

		return convertToDto(savedBoard);
	}

	public BoardModel updateBoard(Long id, CreateBoardRequestDto boardDto) {
		BoardModel existingBoard = boardRepository.findById(id).orElse(null);

		if (existingBoard != null) {
			BeanUtils.copyProperties(boardDto, existingBoard, "id");
			BoardModel updatedBoard = boardRepository.save(existingBoard);
			updatedBoard.setCocktails(null);
			List<CocktailModel> cocktails = boardDto.getCocktails().stream()
					.map(temp -> {
						Optional<DrinkModel> drinkModel = drinkRepository.findById(temp.getDrink().getId());
						CocktailModel insert = new CocktailModel();
						insert.setId(temp.getId());
						insert.setUnit(temp.getUnit());
						insert.setProportion(temp.getProportion());
						insert.setBoard(updatedBoard);
						drinkModel.ifPresent(insert::setDrink);
						return insert;
					})
					.collect(Collectors.toList());

			cocktailRepository.saveAll(cocktails);

			return updatedBoard;
		}

		return null;
	}

	public void deleteBoard(Long id) {
		boardRepository.deleteById(id);
	}

	public void likeBoard(Long id, Long myId) {
		UserModel user = new UserModel();
		user.setId(myId);
		BoardModel board = new BoardModel();
		board.setId(id);
		// 유저가 게시글을 좋아요 했던 기록이 있는가?
		boolean exists = likeRepository.existsByUserAndBoard(user, board);
		if(exists) {
			// 좋아요 취소
			likeRepository.deleteByUserAndBoard(user, board);
		} else {
			// 좋아요 수행
			LikeModel like = new LikeModel();
			like.setUser(user);
			like.setBoard(board);
			likeRepository.save(like);
		}
	}

	public BoardDto convertToDto(Object board) {
		BoardDto boardDto = new BoardDto();
		BeanUtils.copyProperties(board, boardDto);
		return boardDto;
	}

	public BoardModel convertToBoard(Object boardDto) {
		BoardModel board = new BoardModel();
		if (boardDto != null) {
			BeanUtils.copyProperties(boardDto, board);
		}
		return board;
	}

	public Page<ViewBoardResponseDto> searchAndPageBoards(String keyword, int page, int size, int option) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		PageRequest pageable = PageRequest.of(page, size, sort);

		// 검색 및 페이징을 위한 Specification을 사용
		Specification<BoardModel> spec;
		switch(option) {
			case 1: spec = BoardSpecifications.search(keyword); break;  //전체
			case 2: spec = BoardSpecifications.search(keyword, "admin", 1); break;  //관리자
			default : spec = BoardSpecifications.search(keyword, "admin", -1); break;  //유저
		}

		Page<BoardModel> pageResult = boardRepository.findAll(spec, pageable);

		List<ViewBoardResponseDto> result = pageResult.getContent().stream()
				.map(board -> {
					ViewBoardResponseDto boardDto = new ViewBoardResponseDto();
					BeanUtils.copyProperties(board, boardDto);

					List<CocktailWithDrinkDto> cocktails = board.getCocktails().stream()
							.map(temp -> {
								CocktailWithDrinkDto insert = new CocktailWithDrinkDto();
								BeanUtils.copyProperties(temp, insert);

								DrinkWithoutCocktailDto drinkDto = new DrinkWithoutCocktailDto();
								BeanUtils.copyProperties(temp.getDrink(), drinkDto);

								insert.setDrink(drinkDto);
								return insert;
							})
							.collect(Collectors.toList());

					List<CommentDto> comments = board.getComments().stream()
							.map(temp -> {
								CommentDto insert = new CommentDto();
								BeanUtils.copyProperties(temp, insert);
								return insert;
							})
							.collect(Collectors.toList());

					boardDto.setCocktails(cocktails);
					boardDto.setComments(comments);
					return boardDto;
				})
				.collect(Collectors.toList());

		return new PageImpl<>(result, pageable, pageResult.getTotalElements());
	}

	public ViewBoardResponseDto getBoardByIdWithoutLike(Long id) {
		BoardModel board = boardRepository.findById(id).orElse(null);

		if (board != null) {
			ViewBoardResponseDto boardDto = new ViewBoardResponseDto();
			BeanUtils.copyProperties(board, boardDto);

			List<CocktailWithDrinkDto> list = board.getCocktails().stream()
					.map(temp -> {
						CocktailWithDrinkDto insert = new CocktailWithDrinkDto();
						BeanUtils.copyProperties(temp, insert);

						DrinkWithoutCocktailDto drinkDto = new DrinkWithoutCocktailDto();
						BeanUtils.copyProperties(temp.getDrink(), drinkDto);

						insert.setDrink(drinkDto);
						return insert;
					})
					.collect(Collectors.toList());

			boardDto.setCocktails(list);
			List<CommentDto> comments = board.getComments().stream()
					.map(temp -> {
						CommentDto insert = new CommentDto();
						BeanUtils.copyProperties(temp, insert);
						return insert;
					}).collect(Collectors.toList());
			boardDto.setComments(comments);
			return boardDto;
		}
		return null;
	}

	public String storeFile(MultipartFile file) throws IOException {

		// 파일 이름 설정 (랜덤한 영어 10자리 + 원래 확장자)
		String randomEnglish = RandomStringUtils.randomAlphabetic(10);
		String originalFilename = file.getOriginalFilename();
		String extension = originalFilename.substring(originalFilename.lastIndexOf("."));

		String fileName = randomEnglish + extension;

		// 파일 저장 경로 설정
		Path targetLocation = this.fileStorageLocation.resolve(fileName);

		// 파일 저장
		Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

		return "BoardFileUploads/" + fileName;
	}

	public Page<ViewBoardResponseDto> getMyPageEntities(int page, int size, String nickname) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<BoardModel> entities = boardRepository.findByNickname(nickname, pageable);

		List<ViewBoardResponseDto> result = entities.stream()
				.map(board -> {
					ViewBoardResponseDto boardDto = new ViewBoardResponseDto();
					BeanUtils.copyProperties(board, boardDto);

					List<CocktailWithDrinkDto> cocktails = board.getCocktails().stream()
							.map(temp -> {
								CocktailWithDrinkDto insert = new CocktailWithDrinkDto();
								BeanUtils.copyProperties(temp, insert);

								DrinkWithoutCocktailDto drinkDto = new DrinkWithoutCocktailDto();
								BeanUtils.copyProperties(temp.getDrink(), drinkDto);

								insert.setDrink(drinkDto);
								return insert;
							})
							.collect(Collectors.toList());

					List<CommentDto> comments = board.getComments().stream()
							.map(temp -> {
								CommentDto insert = new CommentDto();
								BeanUtils.copyProperties(temp, insert);
								return insert;
							})
							.collect(Collectors.toList());

					boardDto.setCocktails(cocktails);
					boardDto.setComments(comments);
					return boardDto;
				})
				.collect(Collectors.toList());

		return new PageImpl<>(result, pageable, entities.getTotalElements());
	}

	public Page<ViewBoardResponseDto> getLikedPageEntities(int page, int size, Long userId) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);

		// 사용자가 좋아요 한 board_id 리스트를 가져온다.
		List<Long> likedBoardIds = likeRepository.findLikedBoardIdsByUserId(userId);

		// Specification을 사용하여 조건에 맞는 BoardModel 조회
		Page<BoardModel> entities = boardRepository.findAll(BoardSpecifications.boardIsLikedByUser(likedBoardIds), pageable);

		List<ViewBoardResponseDto> result = entities.stream()
				.map(board -> {
					ViewBoardResponseDto boardDto = new ViewBoardResponseDto();
					BeanUtils.copyProperties(board, boardDto);

					List<CocktailWithDrinkDto> cocktails = board.getCocktails().stream()
							.map(temp -> {
								CocktailWithDrinkDto insert = new CocktailWithDrinkDto();
								BeanUtils.copyProperties(temp, insert);

								DrinkWithoutCocktailDto drinkDto = new DrinkWithoutCocktailDto();
								BeanUtils.copyProperties(temp.getDrink(), drinkDto);

								insert.setDrink(drinkDto);
								return insert;
							})
							.collect(Collectors.toList());

					List<CommentDto> comments = board.getComments().stream()
							.map(temp -> {
								CommentDto insert = new CommentDto();
								BeanUtils.copyProperties(temp, insert);
								return insert;
							})
							.collect(Collectors.toList());

					boardDto.setCocktails(cocktails);
					boardDto.setComments(comments);
					return boardDto;
				})
				.collect(Collectors.toList());

		return new PageImpl<>(result, pageable, entities.getTotalElements());
	}

}
