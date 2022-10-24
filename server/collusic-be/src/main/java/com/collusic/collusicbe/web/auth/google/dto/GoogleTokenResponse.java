package com.collusic.collusicbe.web.auth.google.dto;

import com.collusic.collusicbe.web.auth.OAuth2Response;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;


@Getter
@Setter
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleTokenResponse implements OAuth2Response {

    private String accessToken;
    private String idToken;
    private Integer expiresIn;
    private String tokenType;
    private String scope;
    private String refreshToken;

    @Override
    public Map<String, Object> getAttributes() {
        Map<String, Object> attributes = new HashMap<>();

        attributes.put("access_token", accessToken);
        attributes.put("id_token", idToken);
        attributes.put("expires_in", expiresIn);
        attributes.put("token_type", tokenType);
        attributes.put("scope", scope);
        attributes.put("refresh_token", refreshToken);

        return attributes;
    }
}
