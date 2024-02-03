package com.ssafy.koala.repository;

import com.ssafy.koala.model.BoardModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardModel, Long>, JpaSpecificationExecutor<BoardModel> {
    Page<BoardModel> findAll(Specification<BoardModel> spec, Pageable pageable);
}
