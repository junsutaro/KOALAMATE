package com.ssafy.koala.service;

import com.ssafy.koala.dto.BoardDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.repository.BoardRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	public List<BoardDto> getPageEntities(Pageable pageable) {
		Page<BoardModel> entities = boardRepository.findAll(pageable);
		return entities.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	public BoardDto getBoardById(Long id) {
		BoardModel board = boardRepository.findById(id).orElse(null);
		return (board != null) ? convertToDto(board) : null;
	}

	public BoardDto createBoard(BoardDto boardDto) {
		BoardModel board = convertToBoard(boardDto);
		BoardModel savedBoard = boardRepository.save(board);
		return convertToDto(savedBoard);
	}

	public BoardDto updateBoard(Long id, BoardDto boardDto) {
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

	private BoardDto convertToDto(BoardModel board) {
		BoardDto boardDto = new BoardDto();
		BeanUtils.copyProperties(board, boardDto);
		return boardDto;
	}

	private BoardModel convertToBoard(BoardDto boardDto) {
		BoardModel board = new BoardModel();
		BeanUtils.copyProperties(boardDto, board);
		return board;
	}
}
