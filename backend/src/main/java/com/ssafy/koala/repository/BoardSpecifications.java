package com.ssafy.koala.repository;

import com.ssafy.koala.model.BoardModel;
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
                //predicates.add(criteriaBuilder.like(root.get("nickname"), "%" + keyword + "%"));
                predicates.add(criteriaBuilder.like(root.get("content"), "%" + keyword + "%"));
            }

            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<BoardModel> search(String keyword, String nickname, int option) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(keyword)) {
                Predicate keywordPredicate = criteriaBuilder.or(
                        criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                        criteriaBuilder.like(root.get("content"), "%" + keyword + "%")
                );
                predicates.add(keywordPredicate);
            }

            if (StringUtils.hasText(nickname)) {
                Predicate nicknamePredicate;
                if (option == 1) {
                    nicknamePredicate = criteriaBuilder.equal(root.get("nickname"), "admin");
                } else {
                    nicknamePredicate = criteriaBuilder.notEqual(root.get("nickname"), "admin");
                }
                predicates.add(nicknamePredicate);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
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
}
