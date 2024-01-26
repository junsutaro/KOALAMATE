//package com.ssafy.koala.config.jwt;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.web.access.AccessDeniedHandler;
//import org.springframework.web.ErrorResponse;
//
//import java.io.IOException;
//
//// Security 필터 예외 처리(인가)
//public class CustomAccessDeniedHandler implements AccessDeniedHandler {
//
//	private ObjectMapper mapper = new ObjectMapper();
//	@Override
//	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
//
//		String accept = request.getHeader("Accept");
//
//		if ("application/json".equals(accept)) {
//			ErrorResponse error = ErrorResponse.builder()
//					.code("403")
//					.message("접근 권한이 없습니다.")
//					.build();
//
//			String result = mapper.writeValueAsString(error);
//
//			response.setStatus(403);
//			response.getWriter().write(result);
//		}
//	}
//}
