package com.ssafy.koala.model;

import com.ssafy.koala.model.user.UserModel;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class BoardModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String title;
	private String content;
	private Date date;
	private int views;
	private String nickname;

	@OneToOne
	private RecipeModel recipe;

	@OneToMany
	private List<UserModel> users = new ArrayList<>();

	@OneToMany(mappedBy = "board")
	private List<CommentModel> comments = new ArrayList<>();
}
