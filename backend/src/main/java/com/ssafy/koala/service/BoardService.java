package com.ssafy.koala.service;

import com.ssafy.koala.dto.Board.BoardDto;
import com.ssafy.koala.dto.Board.CreateBoardRequestDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.RecipeModel;
import com.ssafy.koala.repository.BoardRepository;
import com.ssafy.koala.repository.RecipeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {

	private final BoardRepository boardRepository;
	public BoardService(BoardRepository boardRepository) {
		this.boardRepository = boardRepository;
	}

	public List<BoardDto> getAllEntities() {
		List<BoardModel> entities = boardRepository.findAll();
		return entities.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	public List<BoardDto> getPageEntities(int page, int size) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<BoardModel> entities = boardRepository.findAll(pageable);
		return entities.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	public BoardDto getBoardById(Long id) {
		BoardModel board = boardRepository.findById(id).orElse(null);
		return (board != null) ? convertToDto(board) : null;
	}

	public BoardDto createBoard(BoardModel boardModel) {
		//모자란 부분 추가
		BoardModel savedBoard = boardRepository.save(boardModel);

		return convertToDto(savedBoard);
	}

	public BoardDto updateBoard(Long id, CreateBoardRequestDto boardDto) {
		BoardModel existingBoard = boardRepository.findById(id).orElse(null);

		if (existingBoard != null) {
			BeanUtils.copyProperties(boardDto, existingBoard, "id");
			BoardModel updatedBoard = boardRepository.save(existingBoard);
			return convertToDto(updatedBoard);
		}

		return null;
	}

	public void deleteBoard(Long id) {
		boardRepository.deleteById(id);
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
}
