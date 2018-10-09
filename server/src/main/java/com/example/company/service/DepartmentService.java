package com.example.company.service;

import com.example.company.model.Department;
import com.example.company.payload.DepartmentResponse;
import com.example.company.repository.DepartmentRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    private DepartmentResponse convertToDto(Department department) {
        DepartmentResponse departmentResponse = modelMapper.map(department, DepartmentResponse.class);
        return departmentResponse;
    }

    private Sort sortByNameAsc() {
        return new Sort(Sort.Direction.ASC, "departmentName");
    }

    private static final Logger logger = LoggerFactory.getLogger(DepartmentService.class);

    public List<DepartmentResponse> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll(sortByNameAsc());

        if(departments.size() == 0) {
            return new ArrayList<>(Collections.emptyList());
        }
        return departments.stream().map(department -> convertToDto(department)).collect(Collectors.toList());
    }



}
