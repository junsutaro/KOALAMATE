package com.ssafy.koala.dto.Board;

import com.ssafy.koala.dto.Cocktail.CocktailWithDrinkDto;
import com.ssafy.koala.dto.CommentDto;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ViewBoardResponseDto {
    private long id;
    private String title;
    private String content;
    private Date date;
    private int views;
    private String nickname;
    private String image;
    private List<CocktailWithDrinkDto> cocktails;
    private List<CommentDto> comments;
}
