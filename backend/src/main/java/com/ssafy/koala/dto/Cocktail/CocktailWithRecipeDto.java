package com.ssafy.koala.dto.Cocktail;

import com.ssafy.koala.dto.Drink.DrinkWithoutCocktailDto;
import com.ssafy.koala.dto.Recipe.RecipeDto;
import com.ssafy.koala.dto.Recipe.RecipeWithoutCocktailDto;
import lombok.Data;

import java.util.List;

@Data
public class CocktailWithRecipeDto {
    private Long id;

    private double proportion;  //비율
    private String unit;  //단위

    private RecipeWithoutCocktailDto recipe;
}
