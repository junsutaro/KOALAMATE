package com.ssafy.koala.dto;

import com.ssafy.koala.model.CommentModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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

	private List<CommentModel> comments;
}
