package com.ssafy.koala.dto.Cocktail;

import com.ssafy.koala.dto.Drink.DrinkWithoutCocktailDto;
import com.ssafy.koala.dto.Recipe.RecipeWithoutCocktailDto;
import com.ssafy.koala.model.DrinkModel;
import com.ssafy.koala.model.RecipeModel;
import lombok.Data;

@Data
public class CocktailDto {
    private Long id;

    private double proportion;  //비율
    private String unit;  //단위

    private DrinkModel drink;
    private RecipeModel recipe;
}
