package com.ssafy.koala.dto.Recipe;

import com.ssafy.koala.dto.Cocktail.CocktailWithDrinkDto;
import com.ssafy.koala.dto.Cocktail.CocktailWithRecipeDto;
import lombok.Data;

import java.util.List;

@Data
public class RecipeDto {
    private long id;
    private String name;
    private String manufacturer;
    private String image;
    private List<CocktailWithDrinkDto> cocktails;
}
