package com.writeractive.writeractiveserver.reading.dto;

import com.writeractive.writeractiveserver.useraccount.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class UserInfoDtoMapper {

    ModelMapper modelMapper = new ModelMapper();

    public UserInfoDto convertToDto(User user){
        return modelMapper.map(user, UserInfoDto.class);
    }

    public User convertToEntity(UserInfoDto userInfoDto){
        return modelMapper.map(userInfoDto, User.class);
    }
}
