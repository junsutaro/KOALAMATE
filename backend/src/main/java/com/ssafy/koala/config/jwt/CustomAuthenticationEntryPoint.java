//package com.ssafy.koala.config.jwt;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import org.springframework.web.ErrorResponse;
//
//import java.io.IOException;
//
//// Security 필터 예외 처리(인증)
//public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
//	private ObjectMapper mapper = new ObjectMapper();
//	@Override
//	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//		String accept = request.getHeader("Accept");
//
//		if ("application/json".equals(accept)) {
//			ErrorResponse error = ErrorResponse.builder()
//					.code("401")
//					.message("인증이 필요합니다.")
//					.build();
//
//			String result = mapper.writeValueAsString(error);
//
//			response.setStatus(401);
//			response.getWriter().write(result);
//		}
//	}
//}
