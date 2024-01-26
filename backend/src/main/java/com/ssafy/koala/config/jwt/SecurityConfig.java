package com.ssafy.koala.config.jwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private static final String[] AUTH_WHITELIST = {
			"/api/v1/member/**", "/swagger-ui/**", "/api-docs", "/swagger-ui-custom.html",
			"/v3/api-docs/**", "/api-docs/**", "/swagger-ui.html", "/api/v1/auth/**", "/user/**", "/board/**",
			"/comment/**","/drink/**","/recipe/**","/cocktail/**"
	};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.cors(Customizer.withDefaults()) // CORS 설정 적용
				.authorizeHttpRequests(authorize -> authorize.requestMatchers(AUTH_WHITELIST).permitAll())
				.csrf(csrf -> csrf.disable()) // CSRF 설정 적용
		// 기타 Security 설정...
		;
		return http.build();
	}
}