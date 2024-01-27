package com.ssafy.koala.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.koala.model.user.UserModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class BoardModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String title;
	private String content;
	private Date date;
	private int views;
	private String nickname;
	private String image;

	//Like
//	@OneToMany
//	private List<UserModel> users = new ArrayList<>();


	@OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<CocktailModel> cocktails;

	@JsonManagedReference
	@OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<CommentModel> comments;
}
