package com.ssafy.koala.service;

import com.ssafy.koala.dto.BoardDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.repository.BoardRepository;
import org.springframework.beans.BeanUtils;
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

	public BoardDto getBoardById(Long id) {
		BoardModel Board = boardRepository.findById(id).orElse(null);
		return (Board != null) ? convertToDto(Board) : null;
	}

	public BoardDto createBoard(BoardDto BoardDto) {
		BoardModel Board = convertToBoard(BoardDto);
		BoardModel savedBoard = boardRepository.save(Board);
		return convertToDto(savedBoard);
	}

	public BoardDto updateBoard(Long id, BoardDto BoardDto) {
		BoardModel existingBoard = boardRepository.findById(id).orElse(null);

		if (existingBoard != null) {
			BeanUtils.copyProperties(BoardDto, existingBoard, "id");
			BoardModel updatedBoard = boardRepository.save(existingBoard);
			return convertToDto(updatedBoard);
		}

		return null;
	}

	public void deleteBoard(Long id) {
		boardRepository.deleteById(id);
	}

	private BoardDto convertToDto(BoardModel Board) {
		BoardDto boardDto = new BoardDto();
		BeanUtils.copyProperties(Board, boardDto);
		return boardDto;
	}

	private BoardModel convertToBoard(BoardDto BoardDto) {
		BoardModel board = new BoardModel();
		BeanUtils.copyProperties(BoardDto, board);
		return board;
	}
}
