package com.writeractive.writeractiveserver.useraccount.service;

import com.writeractive.writeractiveserver.useraccount.exception.RoleNotFoundException;
import com.writeractive.writeractiveserver.useraccount.exception.UserExistsException;
import com.writeractive.writeractiveserver.useraccount.dto.UserCreateDto;
import com.writeractive.writeractiveserver.useraccount.dto.UserCreateDtoMapper;
import com.writeractive.writeractiveserver.useraccount.model.Role;
import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.useraccount.repository.RoleRepository;
import com.writeractive.writeractiveserver.useraccount.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
public class AuthService {

    UserRepository userRepository;
    RoleRepository roleRepository;
    UserCreateDtoMapper userCreateDtoMapper;
    PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, UserCreateDtoMapper userCreateDtoMapper, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userCreateDtoMapper = userCreateDtoMapper;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void signUpUser(UserCreateDto userCreateDto){

        validateUsernameAndEmail(userCreateDto.getUsername(), userCreateDto.getEmail());
        Set<Role> roles = validateRoles(userCreateDto.getRoles());


        User user = userCreateDtoMapper.convertToEntity(userCreateDto);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRoles(roles);
        userRepository.save(user);
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
}
