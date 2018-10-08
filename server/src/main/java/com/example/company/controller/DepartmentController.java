package com.example.company.controller;

import com.example.company.model.Department;
import com.example.company.payload.ApiResponse;
import com.example.company.payload.DepartmentRequest;
import com.example.company.repository.DepartmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DepartmentController {

    @Autowired
    DepartmentRepository departmentRepository;

    private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);

    @GetMapping("/departments")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD')")
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @PostMapping("/departments")
    public ResponseEntity<?> registerDepartment(@Valid @RequestBody DepartmentRequest departmentRequest) {
        if(departmentRepository.existsByDepartmentName(departmentRequest.getDepartmentName())) {
            return new ResponseEntity(new ApiResponse(false, "Department name already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating new department
        Department department = new Department(departmentRequest.getDepartmentName(),departmentRequest.getCity());

        Department result = departmentRepository.save(department);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/{id}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Department registered successfully"));
    }

}