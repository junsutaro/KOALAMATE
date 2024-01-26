package com.ssafy.koala.controller;

import com.ssafy.koala.dto.Board.BoardDto;
import com.ssafy.koala.dto.Board.CreateBoardRequestDto;
import com.ssafy.koala.dto.Cocktail.CocktailDto;
import com.ssafy.koala.dto.Cocktail.CocktailWithDrinkDto;
import com.ssafy.koala.dto.Recipe.RecipeDto;
import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.CocktailModel;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.model.RecipeModel;
import com.ssafy.koala.service.BoardService;
import com.ssafy.koala.service.CocktailService;
import com.ssafy.koala.service.DrinkService;
import com.ssafy.koala.service.RecipeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/board")
@Tag(name="board", description="board controller")
public class BoardController {
	private final BoardService boardService;
	private final DrinkService drinkService;
	private final RecipeService recipeService;
	private final CocktailService cocktailService;
	@PersistenceContext
	private EntityManager entityManager;

	public BoardController (BoardService boardService, DrinkService drinkService, RecipeService recipeService, CocktailService cocktailService) {
		this.boardService = boardService;
		this.drinkService = drinkService;
		this.recipeService = recipeService;
		this.cocktailService = cocktailService;
	}

	@GetMapping("/list")
	public Object listBoard(@RequestParam int page, @RequestParam int size) {
		ResponseEntity response = null;

		response = new ResponseEntity<>(boardService.getPageEntities(page-1, size),HttpStatus.OK); //페이지 시작은 0부터
		return response;
	}

	@GetMapping("/view")
	public Object viewBoard(@RequestParam long id) {
		ResponseEntity response = null;

		response = new ResponseEntity<>(boardService.getBoardById(id),HttpStatus.OK);
		return response;
	}

	@PostMapping("/write")
	public Object writeBoard(@RequestBody CreateBoardRequestDto board) {
		ResponseEntity response = null;

		BoardModel boardModel = new BoardModel();
		RecipeModel recipe = new RecipeModel();
		RecipeDto recipeDto = board.getRecipe();

		BeanUtils.copyProperties(board,boardModel);
		BeanUtils.copyProperties(recipeDto, recipe);

		boardModel.setRecipe(recipe);

		BoardDto boardDto = boardService.createBoard(boardModel);
		recipe.setBoard(boardModel);


		List<CocktailModel> list = new ArrayList<>();
		for(CocktailWithDrinkDto temp : board.getRecipe().getCocktails()) {
			CocktailModel insert = new CocktailModel();

			DrinkModel drinkModel = new DrinkModel();
			BeanUtils.copyProperties(drinkService.getDrinkModelById(temp.getDrink().getId()), drinkModel);

			insert.setDrink(drinkModel);
			insert.setRecipe(recipe);
			insert.setProportion(temp.getProportion());
			insert.setUnit(temp.getUnit());
			insert.setId(temp.getId());

			list.add(insert);
		}
		recipe.setCocktails(list);
		recipeService.createRecipe(recipe);
		response = new ResponseEntity<>(boardDto,HttpStatus.OK);

		return response;
	}

	@PutMapping("/modify/{board_id}")
	public Object modifyBoard(@PathVariable long board_id, @RequestBody CreateBoardRequestDto board) {
		ResponseEntity response = null;

		BoardDto boardDto = boardService.updateBoard(board_id, board);
		response = new ResponseEntity<>(boardDto,HttpStatus.OK);

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
}
