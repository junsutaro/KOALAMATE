package com.ssafy.koala.dto.Board;

import com.ssafy.koala.dto.Recipe.RecipeDto;
import com.ssafy.koala.model.CommentModel;
import com.ssafy.koala.model.RecipeModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class BoardDto {
	private long id;
	private String title;
	private String content;
	private Date date;
	private int views;
	private String nickname;
	private String image;
	private RecipeModel recipe;
	private List<CommentModel> comments;
}
