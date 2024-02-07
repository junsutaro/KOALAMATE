package com.ssafy.koala.repository;

import com.ssafy.koala.model.BoardModel;
import com.ssafy.koala.model.CocktailModel;
import com.ssafy.koala.model.DrinkModel;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class BoardSpecifications {

    public static Specification<BoardModel> search(String keyword) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(keyword)) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + keyword + "%"));
                predicates.add(criteriaBuilder.like(root.get("nickname"), "%" + keyword + "%"));
                predicates.add(criteriaBuilder.like(root.get("content"), "%" + keyword + "%"));
            }

            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<BoardModel> boardIsLikedByUser(List<Long> boardIds) {
        return (root, query, criteriaBuilder) -> {
            if (boardIds == null || boardIds.isEmpty()) {
                return criteriaBuilder.conjunction(); // 비어있는 조건 처리
            }
            return root.get("id").in(boardIds); // board_id 리스트에 포함된 BoardModel 조회
        };
    }

    public static Specification<BoardModel> withDrinkName(String drinkName) {
        return (root, query, criteriaBuilder) -> {
            if (drinkName == null || drinkName.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            // cocktails과 drinks를 조인합니다.
            Join<BoardModel, CocktailModel> cocktailsJoin = root.join("cocktails", JoinType.INNER);
            Join<CocktailModel, DrinkModel> drinksJoin = cocktailsJoin.join("drink", JoinType.INNER);

            // drinks의 name을 기준으로 검색 조건을 설정합니다.
            return criteriaBuilder.like(drinksJoin.get("name"), "%" + drinkName + "%");
        };
    }
}
