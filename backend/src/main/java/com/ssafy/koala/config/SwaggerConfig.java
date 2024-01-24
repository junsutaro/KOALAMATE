package com.ssafy.koala.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition
public class SwaggerConfig {
	@Bean
	// localhost:xxxx/swagger-ui/index.html#/  << 접속경로
	public OpenAPI baseOpenAPI() {
		return new OpenAPI().info(new Info().title("koala-back").version("1.0").description("backend api"));
	}
}

