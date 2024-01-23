package com.ssafy.koala.controller;

import com.ssafy.koala.service.BoardService;
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
}
