package com.writeractive.writeractiveserver.useraccount.dto;

import com.writeractive.writeractiveserver.useraccount.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserCreateDtoMapper {

    private final ModelMapper modelMapper;

    public UserCreateDtoMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    public UserCreateDto convertToDto(User user){
        return modelMapper.map(user, UserCreateDto.class);
    }

    public User convertToEntity(UserCreateDto userCreateDto){
        return modelMapper.map(userCreateDto, User.class);
    }
}
