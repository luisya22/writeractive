package com.writeractive.writeractiveserver.useraccount.service;

import com.writeractive.writeractiveserver.useraccount.exception.RefreshTokenNotFoundException;
import com.writeractive.writeractiveserver.useraccount.exception.TokenRefreshException;
import com.writeractive.writeractiveserver.useraccount.exception.UserNotFoundException;
import com.writeractive.writeractiveserver.useraccount.model.RefreshToken;
import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.useraccount.repository.RefreshTokenRepository;
import com.writeractive.writeractiveserver.useraccount.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Value("${writeractiveserver.app.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;


    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken findByToken(String token){
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByToken(token);

        if(refreshToken.isEmpty()){
            throw new RefreshTokenNotFoundException();
        }

        return refreshToken.get();
    }

    public RefreshToken createRefreshToken(Long userId){
        Optional<User> user = userRepository.findById(userId);

        if(user.isEmpty()){
            throw new UserNotFoundException("User not found with id " + userId);
        }

        Instant expiryDate = Instant.now().plusMillis(refreshTokenDurationMs);
        String token = UUID.randomUUID().toString();

        RefreshToken refreshToken = new RefreshToken(user.get(), token, expiryDate);

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now()) < 0){
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException("Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    public int deleteByUserId(Long id){
        refreshTokenRepository.deleteById(id);

        return 1;
    }
}
