package com.ssafy.koala.controller;

import com.ssafy.koala.dto.cocktail.CocktailWithBoardDto;
import com.ssafy.koala.dto.drink.DrinkDto;
import com.ssafy.koala.dto.drink.DrinkWithoutCocktailDto;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.repository.LikeRepository;
import com.ssafy.koala.service.AuthService;
import com.ssafy.koala.service.DrinkService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/drink")
@Tag(name="drink", description="drink controller")
public class DrinkController {
    private final DrinkService drinkService;
    private final AuthService authService;
    private final LikeRepository likeRepository;

    public DrinkController(DrinkService drinkService, AuthService authService, LikeRepository likeRepository) {
        this.drinkService = drinkService;
        this.authService = authService;
        this.likeRepository = likeRepository;
    }

    @GetMapping("/{drink_id}")
    public Object getDrink(@PathVariable long drink_id, HttpServletRequest request) {
        DrinkDto drinkDto = drinkService.getDrinkById(drink_id);
        if(drinkDto == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        boolean isLogin = false;
        String accessToken = null;
        try {
            accessToken = authService.getAccessToken(request);
            isLogin = true;
        }
        catch(BadCredentialsException e) {
            isLogin = false;
        }
        if(isLogin) {
            long userId = authService.extractUserFromToken(accessToken).getId();
            for(CocktailWithBoardDto cocktail : drinkDto.getCocktails()) {
                if(likeRepository.existsByUserIdAndBoardId(userId,cocktail.getBoard().getId()))
                    cocktail.getBoard().setLike(true);
            }
        }

        return new ResponseEntity<>(drinkDto,HttpStatus.OK);
    }

    @PostMapping("/write")
    public Object createDrink(@RequestBody DrinkWithoutCocktailDto drinkDto) {
        DrinkModel drinkModel = drinkService.createDrink(drinkDto);

        return new ResponseEntity<>(drinkModel, HttpStatus.OK);
    }

    @PostMapping("/search/category")
    public Object searchDrinkByCategory(@RequestBody int category) {
        List<DrinkDto> drinks = drinkService.getDrinkByCategory(category);

        return new ResponseEntity<>(drinks, HttpStatus.OK);
    }

    @GetMapping("/search")
    public Object searchDrinkByName(@RequestParam String name) {
        List<DrinkDto> drinks = drinkService.getDrinkByName(name);

        return new ResponseEntity<>(drinks, HttpStatus.OK);
    }
}
