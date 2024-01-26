package com.ssafy.koala.dto.Recipe;

import lombok.Data;

@Data
public class RecipeWithoutCocktailDto {
    private long id;
    private String name;
    private String manufacturer;
    private String image;
}
