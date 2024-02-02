package com.ssafy.koala;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BackendChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendChatApplication.class, args);
	}

}
