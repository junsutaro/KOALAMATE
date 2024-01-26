package com.ssafy.koala.repository;

import com.ssafy.koala.model.DrinkModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkRepository extends JpaRepository<DrinkModel, Long> {
}
