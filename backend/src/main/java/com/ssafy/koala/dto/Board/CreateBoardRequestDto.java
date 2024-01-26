package com.ssafy.koala.dto.Board;

import com.ssafy.koala.dto.Recipe.RecipeDto;
import lombok.Data;

import java.util.Date;

@Data
public class CreateBoardRequestDto {
    private long id;
    private String title;
    private String content;
    private Date date;
    private int views;
    private String nickname;
    private String image;
    private RecipeDto recipe;
}
