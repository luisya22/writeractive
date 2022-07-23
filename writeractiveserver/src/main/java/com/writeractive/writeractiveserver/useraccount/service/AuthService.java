package com.writeractive.writeractiveserver.useraccount.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.writeractive.writeractiveserver.useraccount.dto.TokensDto;
import com.writeractive.writeractiveserver.useraccount.exception.RoleNotFoundException;
import com.writeractive.writeractiveserver.useraccount.exception.UserExistsException;
import com.writeractive.writeractiveserver.useraccount.dto.UserCreateDto;
import com.writeractive.writeractiveserver.useraccount.dto.UserCreateDtoMapper;
import com.writeractive.writeractiveserver.useraccount.model.RefreshToken;
import com.writeractive.writeractiveserver.useraccount.model.Role;
import com.writeractive.writeractiveserver.useraccount.model.SecurityUser;
import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.useraccount.repository.RoleRepository;
import com.writeractive.writeractiveserver.useraccount.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserCreateDtoMapper userCreateDtoMapper;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;

    public AuthService(UserRepository userRepository, UserCreateDtoMapper userCreateDtoMapper, RoleRepository roleRepository, PasswordEncoder passwordEncoder, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.userCreateDtoMapper = userCreateDtoMapper;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenService = refreshTokenService;
    }

    public void signUpUser(UserCreateDto userCreateDto){

        validateUsernameAndEmail(userCreateDto.getUsername(), userCreateDto.getEmail());
        Set<Role> roles = validateRoles(userCreateDto.getRoles());


        User user = userCreateDtoMapper.convertToEntity(userCreateDto);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRoles(roles);
        userRepository.save(user);
    }

    public TokensDto refreshToken(String refreshTokenString, String url){

        RefreshToken refreshToken = refreshTokenService.findByToken(refreshTokenString);
        refreshTokenService.verifyExpiration(refreshToken);

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        refreshToken.getUser()
                .getRoles()
                .forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));

        SecurityUser securityUser = new SecurityUser(refreshToken.getUser(), authorities);
        String accessToken = generateAccessToken(securityUser, url);
        refreshToken = refreshTokenService.createRefreshToken(refreshToken.getUser().getId());

        return new TokensDto(accessToken, refreshToken.getToken());
    }



    // Utility classes

    private Set<Role> validateRoles(Set<String> roles){

        Set<Role> dbRoles = new HashSet<>();

        roles.forEach( role -> {

            Optional<Role> dbRole = roleRepository.findByName(role);

            if(dbRole.isEmpty()){
                throw new RoleNotFoundException(role);
            }

            dbRoles.add(dbRole.get());
        });

        return dbRoles;
    }

    private void validateUsernameAndEmail(String username, String email){
        boolean existsByUsername = userRepository.existsByUsername(username);

        if(existsByUsername){
            throw new UserExistsException("A user with this username already exists");
        }

        boolean existsByEmail = userRepository.existsByEmail(email);

        if(existsByEmail){
            throw new UserExistsException("A user with this email already exists");
        }
    }

        public String generateAccessToken(SecurityUser securityUser, String url){
            Algorithm algorithm =  Algorithm.HMAC256("secret".getBytes());
            return JWT.create()
                    .withSubject(securityUser.getUser().getId().toString())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                    .withIssuer(url)
                    .withClaim("roles", securityUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                    .sign(algorithm);
        }
    }
