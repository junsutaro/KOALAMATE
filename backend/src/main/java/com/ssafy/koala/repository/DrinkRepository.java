package com.ssafy.koala.repository;

import com.ssafy.koala.model.DrinkModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrinkRepository extends JpaRepository<DrinkModel, Long> {
    List<DrinkModel> findAllByCategory(int category);
    List<DrinkModel> findAllByNameContaining(String name);
}
