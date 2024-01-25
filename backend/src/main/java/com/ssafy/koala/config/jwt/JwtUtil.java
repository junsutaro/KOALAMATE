package com.ssafy.koala.config.jwt;

import com.ssafy.koala.dto.user.UserDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

// JWT 관련 메서드 제공 클래스
@Slf4j
@Component
public class JwtUtil {
	private final Key key;
	private final long accessTokenExpTime;
	private final long refreshTokenExpTime;

	public JwtUtil(
			@Value(value = "${jwt.secret}") String secretKey,
			@Value(value = "${jwt.expirationTime}") long accessTokenExpTime,
			@Value(value = "${jwt.refreshTokenExpTime}") long refreshTokenExpTime
	) {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
		this.accessTokenExpTime = accessTokenExpTime;
		this.refreshTokenExpTime = refreshTokenExpTime;
	}

	/**
	 * Access Token 생성
	 * @param user
	 * @return Access Token String
	 */
	public String createAccessToken(UserDto user) {
		return createToken(user, "AccessToken", accessTokenExpTime);
	}

	/**
	 * Refresh Token 생성
	 * @param user
	 * @return Refresh Token String
	 */
	public String createRefreshToken(UserDto user) {
		return createToken(user, "RefreshToken", refreshTokenExpTime);
	}

	/**
	 * JWT 생성
	 * @param user
	 * @param expireTime
	 * @return JWT String
	 */
	private String createToken(UserDto user, String subject, long expireTime) {
		Claims claims = Jwts.claims();
		claims.put("subject", subject);
		claims.put("userId", user.getId());
		claims.put("email", user.getEmail());
		claims.put("isAdmin", user.isAdmin());

		ZonedDateTime now = ZonedDateTime.now();
		ZonedDateTime tokenValidity = now.plusSeconds(expireTime);


		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(Date.from(now.toInstant()))
				.setExpiration(Date.from(tokenValidity.toInstant()))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}


	/**
	 * Token에서 User ID 추출
	 * @param token
	 * @return User ID
	 */
	public Long getUserId(String token) {
		return parseClaims(token).get("memberId", Long.class);
	}


	/**
	 * JWT 검증
	 * @param token
	 * @return IsValidate
	 */
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.info("Invalid JWT Token", e);
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT Token", e);
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token", e);
		} catch (IllegalArgumentException e) {
			log.info("JWT claims string is empty.", e);
		}
		return false;
	}


	/**
	 * JWT Claims 추출
	 * @param accessToken
	 * @return JWT Claims
	 */
	public Claims parseClaims(String accessToken) {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}
}
