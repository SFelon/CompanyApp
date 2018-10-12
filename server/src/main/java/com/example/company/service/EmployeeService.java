package com.example.company.service;

import com.example.company.model.User;
import com.example.company.payload.ApiResponse;
import com.example.company.payload.UserProfile;
import com.example.company.repository.DepartmentRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    private UserProfile convertUserToDto(User user) {
        //modelMapper.addMappings(mapper -> mapper.skip(UserProfile::setDepartmentName));
        UserProfile userProfile = modelMapper.map(user, UserProfile.class);
        return userProfile;
    }


    private static final Logger logger = LoggerFactory.getLogger(DepartmentService.class);

    public ResponseEntity<?> getEmployeesByDepartment(String id) {
        Long idLong = Long.parseLong(id);

        List<User> users = departmentRepository.getUsersByDepartment(idLong);
        users.removeAll(Collections.singleton(null));
        if(CollectionUtils.isEmpty(users)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department does not have registered employees!"),
                    HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(new ArrayList<>(users.stream().map(user -> convertUserToDto(user)).collect(Collectors.toList())));
    }
}
