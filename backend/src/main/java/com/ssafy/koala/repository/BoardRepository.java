package com.ssafy.koala.repository;

import com.ssafy.koala.model.BoardModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardModel, Long>, JpaSpecificationExecutor<BoardModel> {
    Page<BoardModel> findAll(Specification<BoardModel> spec, Pageable pageable);

    @Query("select b from BoardModel b where b.nickname = :nickname")
    Page<BoardModel> findByNickname(@Param("nickname") String nickname, Pageable pageable);

    @Query("select b from BoardModel b where b.nickname <> 'admin'")
    Page<BoardModel> findUserBoard(Pageable pageable);

    @Query("select b from BoardModel b where b.id in (select c.board.id from CocktailModel c where c.drink.name like '%' || :name || '%')")
    Page<BoardModel> findBoardByDrinkName(@Param("name") String name, Pageable pageable);

    @Query("select b from BoardModel b where b.id in (select c.board.id from CocktailModel c where c.drink.category = :category)")
    Page<BoardModel> findBoardByDrinkCategory(@Param("category") int category, Pageable pageable);

    @Query("select b from BoardModel b where b.userId = :userId")
    Page<BoardModel> findBoardById(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT b FROM BoardModel b " +
            "WHERE b.id IN (SELECT c.board.id FROM CocktailModel c GROUP BY c.board HAVING COUNT(c.board) BETWEEN :minDrinks AND :maxDrinks) " +
            "AND b.id IN (SELECT c.board.id FROM CocktailModel c WHERE c.drink.category = :category GROUP BY c.board)")
    Page<BoardModel> findBoardByDrinkCountAndCategory(@Param("minDrinks") int minDrinks, @Param("maxDrinks") int maxDrinks, @Param("category") int category, Pageable pageable);


}
