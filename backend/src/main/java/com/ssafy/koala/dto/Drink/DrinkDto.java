package com.ssafy.koala.dto.Drink;

import com.ssafy.koala.dto.Cocktail.CocktailWithRecipeDto;
import lombok.Data;

import java.util.List;

@Data
public class DrinkDto {
    private long id;

    private String name;
    private int category;
    private String image;
    private String label;

    private List<CocktailWithRecipeDto> cocktails = null;

}
