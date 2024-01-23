package com.ssafy.koala.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BoardDto {
	private long id;
	private String title;
	private String content;
	private Date date;
	private int views;
	private String nickname;

}
