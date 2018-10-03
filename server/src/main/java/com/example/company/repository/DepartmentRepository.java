package com.example.company.repository;

import com.example.company.model.Department;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByDepartmentName(String departmentName);

    Optional<Department> findById(long departmentId);

    List<Department> findByIdIn(List<Long> departmentIds);

    List<Department> findByIdIn(List<Long> departmentIds, Sort sort);

    Boolean existsByDepartmentName(String departmentName);
}
