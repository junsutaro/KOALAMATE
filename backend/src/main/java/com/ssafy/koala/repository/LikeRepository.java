package com.ssafy.koala.repository;

import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.LikeModel;
import com.ssafy.koala.model.user.UserModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<LikeModel, Long> {
    boolean existsByUserAndBoard(UserModel user, BoardModel board);

    @Transactional
    void deleteByUserAndBoard(UserModel user, BoardModel board);

    long countByBoard_Id(Long boardId);
}
