package com.ssafy.koala.controller;

import com.ssafy.koala.dto.BoardDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.service.BoardService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
public class BoardController {
	private final BoardService boardService;

	public BoardController (BoardService boardService) {
		this.boardService = boardService;
	}

	@GetMapping("/list")
	public Object listBoard(@RequestParam int page, @PageableDefault(sort="id", direction = Sort.Direction.DESC) Pageable pageAble) {
		ResponseEntity response = null;
		response = new ResponseEntity<>(boardService.getPageEntities(pageAble),HttpStatus.OK);
		return response;
	}

	@GetMapping("/view")
	public Object viewBoard(@RequestParam Long id) {
		ResponseEntity response = null;

		response = new ResponseEntity<>(boardService.getBoardById(id),HttpStatus.OK);
		return response;
	}

	@PostMapping("/write")
	public Object writeBoard(@RequestBody BoardDto board) {
		ResponseEntity response = null;

//		BoardModel boardModel = new BoardModel();
//		boardModel.setId(board.getId());
//		boardModel.setTitle(board.getTitle());
//		boardModel.setContent(board.getContent());
//		boardModel.setDate(board.getDate());
//		boardModel.setViews(board.getViews());
//		boardModel.setNickname(board.getNickname());

		BoardDto boardDto = boardService.createBoard(board);
		response = new ResponseEntity<>(boardDto,HttpStatus.OK);

		return response;
	}

	@PutMapping("modify")
	public Object modifyBoard(@RequestParam Long id, @RequestBody BoardDto board) {
		ResponseEntity response = null;

		BoardDto boardDto = boardService.updateBoard(id, board);
		response = new ResponseEntity<>(boardDto,HttpStatus.OK);

		return response;
	}

	@DeleteMapping("delete")
	public Object deleteBoard(@RequestParam Long id) {;
		try {
			boardService.deleteBoard(id);
			return new ResponseEntity<>("Board with ID " + id + " deleted successfully.", HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			// 해당 ID에 해당하는 엔티티가 존재하지 않는 경우
			return new ResponseEntity<>("Board with ID " + id + " not found.", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			// 기타 예외 처리
			return new ResponseEntity<>("Error deleting board with ID " + id, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
