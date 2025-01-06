package com.capstone.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.OneToOne;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType; // 인증 방식
    private String accessToken; // 액세스 토큰
    private String refreshToken; // 리프레시 토큰
    private Long accessTokenExpiresIn; // 액세스 토큰 만료 시간
    private Long refreshTokenExpiresIn; // 리프레시 토큰 만료 시간


}