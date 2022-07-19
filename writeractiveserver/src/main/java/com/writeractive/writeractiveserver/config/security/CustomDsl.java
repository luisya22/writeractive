package com.writeractive.writeractiveserver.config.security;

import com.writeractive.writeractiveserver.config.security.filter.CustomAuthenticationFilter;
import com.writeractive.writeractiveserver.useraccount.service.RefreshTokenService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.stereotype.Component;

@Setter
@Component
public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {

    RefreshTokenService refreshTokenService;

    public CustomDsl(RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception{

        AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);

        CustomAuthenticationFilter authenticationFilter = new CustomAuthenticationFilter(authenticationManager, refreshTokenService);

        authenticationFilter.setFilterProcessesUrl("/api/auth/login");

        http.addFilter(authenticationFilter);
    }

    public static CustomDsl customDsl(RefreshTokenService refreshTokenService){
        return new CustomDsl(refreshTokenService);
    }
}
