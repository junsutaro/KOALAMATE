package com.ssafy.koala.dto.Cocktail;

import com.ssafy.koala.dto.Board.BoardWithoutCocktailDto;
import lombok.Data;

@Data
public class CocktailWithBoardDto {
    private Long id;

    private double proportion;  //비율
    private String unit;  //단위

    private BoardWithoutCocktailDto board;
}
