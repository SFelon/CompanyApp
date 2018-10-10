package com.example.company.service;

import com.example.company.model.Department;
import com.example.company.payload.ApiResponse;
import com.example.company.payload.DepartmentRequest;
import com.example.company.payload.DepartmentResponse;
import com.example.company.repository.DepartmentRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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

    public ResponseEntity<?> addNewDepartment(DepartmentRequest departmentRequest) {
        if(departmentRepository.existsByDepartmentName(departmentRequest.getDepartmentName())) {
            return new ResponseEntity<>(new ApiResponse(false, "Department name already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        Department department = new Department(departmentRequest.getDepartmentName(),departmentRequest.getCity(),
                departmentRequest.getHeadOfDepartment(), departmentRequest.getMinSalary(), departmentRequest.getMaxSalary());

        Department result = departmentRepository.save(department);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Department added successfully"));
    }

    public ResponseEntity<?> updateDepartment(String id, DepartmentRequest departmentRequest) {
        Long idLong = Long.parseLong(id);
        if(!departmentRepository.existsById(idLong)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist!"),
                    HttpStatus.BAD_REQUEST);
        }
        try {
            Department department = modelMapper.map(departmentRequest, Department.class);
            departmentRepository.save(department);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Could not update department in database!"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Department deleted successfully!"),
                HttpStatus.OK);
    }

    public ResponseEntity<?> deleteDepartment(String id) {
        Long idLong = Long.parseLong(id);
        if(!departmentRepository.existsById(idLong)) {
            return new ResponseEntity<>(new ApiResponse(false, "Department with set id does not exist!"),
                    HttpStatus.BAD_REQUEST);
        } else if(departmentRepository.countUsersByDepartmentId(idLong) > 0) {
            System.out.println(departmentRepository.countUsersByDepartmentId(idLong));
            return new ResponseEntity<>(new ApiResponse(false, "Cannot delete department with saved employees!"),
                    HttpStatus.BAD_REQUEST);
        }

        try {
            departmentRepository.deleteById(idLong);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Could not delete department from database!"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new ApiResponse(true, "Department deleted successfully!"),
                HttpStatus.OK);
    }
}
