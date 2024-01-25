package com.ssafy.koala.dto;

import com.ssafy.koala.model.RefrigeratorModel;
import lombok.Data;

@Data
public class RefrigeratorDTO {

    private Long id;
    private int refrigeratorType;
    private String color;

    // 일단 바깥 수정하는건 만들었는데 내부는 ERD 바꿔야 할거같음..
    public static RefrigeratorDTO fromEntity(RefrigeratorModel refrigeratorModel) {
        RefrigeratorDTO dto = new RefrigeratorDTO();
        dto.setId(refrigeratorModel.getId());
        dto.setRefrigeratorType(refrigeratorModel.getRefrigeratorType());
        dto.setColor(refrigeratorModel.getColor());

        return dto;
    }
}
