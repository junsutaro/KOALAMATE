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
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {

	private final BoardRepository boardRepository;
	private final DrinkRepository drinkRepository;
	private final CocktailRepository cocktailRepository;
	private final LikeRepository likeRepository;
	public BoardService(BoardRepository boardRepository, DrinkRepository drinkRepository, CocktailRepository cocktailRepository,
                        LikeRepository likeRepository) {
		this.boardRepository = boardRepository;
		this.drinkRepository = drinkRepository;
		this.cocktailRepository = cocktailRepository;
		this.likeRepository = likeRepository;
    }

	public List<BoardDto> getAllEntities() {
		List<BoardModel> entities = boardRepository.findAll();
		return entities.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	public List<ViewBoardResponseDto> getPageEntities(int page, int size) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<BoardModel> entities = boardRepository.findAll(pageable);

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

		return result;
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

//			AuthService auth = new AuthService();
//			long userId = auth.getCurrentUser().getId();
//			UserModel user = new UserModel();
//			user.setId(userId);
//			boolean isLike = likeRepository.existsByUserAndBoard(user, board);
//			boardDto.setLiked(isLike);
//
//			// 좋아요 수 확인
//			long likeCount = likeRepository.countByBoard_Id(id);
//			boardDto.setLikeCount(likeCount);

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
		BeanUtils.copyProperties(boardDto, board);
		return board;
	}

	public List<ViewBoardResponseDto> searchAndPageBoards(String keyword, int page, int size) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		PageRequest pageable = PageRequest.of(page, size, sort);

		// 검색 및 페이징을 위한 Specification을 사용
		Specification<BoardModel> spec = BoardSpecifications.search(keyword);
		Page<BoardModel> pageResult = boardRepository.findAll(spec, pageable);

		return pageResult.getContent().stream()
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
	}
}
