package com.ssafy.koala.repository;

import com.ssafy.koala.model.RecipeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeModel, Long> {
    Optional<List<RecipeModel>> findByNameContaining(String name);
}
