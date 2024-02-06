package com.ssafy.koala.controller;

import com.ssafy.koala.dto.board.CreateBoardRequestDto;
import com.ssafy.koala.dto.user.UserDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.CocktailModel;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.service.AuthService;
import com.ssafy.koala.service.BoardService;
import com.ssafy.koala.service.CocktailService;
import com.ssafy.koala.service.DrinkService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/board")
@Tag(name="board", description="board controller")
public class BoardController {
	private final BoardService boardService;
	private final DrinkService drinkService;
	private final CocktailService cocktailService;
	private final AuthService authService;
	@PersistenceContext
	private EntityManager entityManager;
	public BoardController (BoardService boardService, DrinkService drinkService, CocktailService cocktailService, AuthService authService) {
		this.boardService = boardService;
		this.drinkService = drinkService;
		this.cocktailService = cocktailService;
        this.authService = authService;
    }

	@GetMapping("/list")
	public Object listBoard(@RequestParam int page, @RequestParam int size) {
		ResponseEntity response = null;

		response = new ResponseEntity<>(boardService.getPageEntities(page-1, size),HttpStatus.OK); //페이지 시작은 0부터
		return response;
	}

	@GetMapping("/view")
	public Object viewBoard(@RequestParam long id, HttpServletRequest request) {

		if(request.getHeader("Authorization") != null) {
			String token = authService.getAccessToken(request);
			UserDto user = authService.extractUserFromToken(token);
			return new ResponseEntity<>(boardService.getBoardById(id, user.getId()),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(boardService.getBoardByIdWithoutLike(id),HttpStatus.OK);
		}
	}

	@Transactional
	@PostMapping("/write")
	public Object writeBoard(@RequestBody CreateBoardRequestDto board) {
		BoardModel boardModel = new BoardModel();
		BeanUtils.copyProperties(board, boardModel);
		boardService.createBoard(boardModel);

		List<CocktailModel> list = board.getCocktails().stream()
				.map(temp -> {
					DrinkModel drinkModel = drinkService.getDrinkModelById(temp.getDrink().getId());

					CocktailModel insert = new CocktailModel();
					insert.setBoard(boardModel);
					insert.setDrink(drinkModel);
					insert.setProportion(temp.getProportion());
					insert.setUnit(temp.getUnit());
					insert.setId(temp.getId());

					return insert;
				})
				.collect(Collectors.toList());

		cocktailService.saveAllCocktails(list);

		ResponseEntity response = new ResponseEntity<>(boardModel, HttpStatus.OK);
		return response;
	}

	@Transactional
	@PutMapping("/modify/{board_id}")
	public Object modifyBoard(@PathVariable long board_id, @RequestBody CreateBoardRequestDto board) {
		ResponseEntity response = null;

		cocktailService.deleteCocktailsByBoardId(board_id);
		BoardModel boardModel = boardService.updateBoard(board_id, board);
		response = new ResponseEntity<>(boardModel,HttpStatus.OK);

		return response;
	}
	
	@DeleteMapping("/delete/{board_id}")
	public Object deleteBoard(@PathVariable long board_id) {;
		try {
			boardService.deleteBoard(board_id);
			return new ResponseEntity<>("Board with ID " + board_id + " deleted successfully.", HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			// 해당 ID에 해당하는 엔티티가 존재하지 않는 경우
			return new ResponseEntity<>("Board with ID " + board_id + " not found.", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// 기타 예외 처리
			return new ResponseEntity<>("Error deleting board with ID " + board_id, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/like")
	public ResponseEntity<?> likeBoard(@RequestBody long board_id, HttpServletRequest request) {
		try{
			String accessToken = authService.getAccessToken(request);
			boardService.likeBoard(board_id, authService.extractUserFromToken(accessToken).getId());
			return new ResponseEntity<>("like request processed successfully.", HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			// 해당 ID에 해당하는 엔티티가 존재하지 않는 경우
			return new ResponseEntity<>("Board with ID " + board_id + " not found.", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// 기타 예외 처리
			return new ResponseEntity<>("Error processing like with ID " + board_id, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/search")
	public ResponseEntity<?> searchBoard(@RequestParam int page, @RequestParam int size, @RequestParam String keyword) {

		return new ResponseEntity<>(boardService.searchAndPageBoards(keyword, page-1, size),HttpStatus.OK);
	}

	@PostMapping("/uploadBoardImage")
	public ResponseEntity<?> uploadBoardImage(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일을 첨부해주세요.");
		}

		try {
			// 이미지 저장 로직 호출
			String imageUrl = boardService.storeFile(file);

			// 저장된 이미지 URL 반환
			return ResponseEntity.ok().body(Map.of("imageUrl", imageUrl));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드에 실패했습니다.");
		}
	}
}
