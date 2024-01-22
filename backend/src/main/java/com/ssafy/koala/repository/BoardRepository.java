package com.ssafy.koala.repository;

import com.ssafy.koala.model.BoardModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardModel, Long> {

}
