package com.ssafy.koala.controller;

import com.ssafy.koala.dto.drink.DrinkDto;
import com.ssafy.koala.dto.drink.DrinkWithoutCocktailDto;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.service.DrinkService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/drink")
@Tag(name="drink", description="drink controller")
public class DrinkController {
    private final DrinkService drinkService;

    public DrinkController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    @GetMapping("/{drink_id}")
    public Object getDrink(@PathVariable long drink_id) {

        DrinkDto drinkDto = drinkService.getDrinkById(drink_id);
        if(drinkDto == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(drinkDto,HttpStatus.OK);
    }

    @PostMapping("/write")
    public Object createDrink(@RequestBody DrinkWithoutCocktailDto drinkDto) {
        DrinkModel drinkModel = drinkService.createDrink(drinkDto);

        return new ResponseEntity<>(drinkModel, HttpStatus.OK);
    }
}
