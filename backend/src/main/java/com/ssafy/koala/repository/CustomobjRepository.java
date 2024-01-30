package com.ssafy.koala.repository;

import com.ssafy.koala.model.CustomobjModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomobjRepository extends JpaRepository<CustomobjModel, Long> {
}
