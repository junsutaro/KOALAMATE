package com.ssafy.koala.dto.drink;

import com.ssafy.koala.dto.cocktail.CocktailWithBoardDto;
import lombok.Data;

import java.util.List;

@Data
public class DrinkDto {
    private long id;

    private String name;
    private int category; //Non_alcohol, Gin, Rum, Vodka, Whiskey, Tequila, Brandy, Liqueur, Beer, Soju
    private String image;
    private String label;

    private List<CocktailWithBoardDto> cocktails;

}
