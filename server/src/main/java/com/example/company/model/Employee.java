//package com.example.company.model;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.Size;
//import java.math.BigDecimal;
//import java.util.Date;
//
//@Entity
//@Table(name = "employees")
//public class Employee {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @NotBlank
//    @Size(max = 25)
//    private String firstName;
//
//    @NotBlank
//    @Size(max = 35)
//    private String lastName;
//
//    @Size(max = 16)
//    private String privatePhone;
//
//    @Size(max = 16)
//    private String businessPhone;
//
//    private Department department;
//
//    private BigDecimal salary;
//
//    private Date dateOfEmployment;
//
//    private boolean isAccountActive;
//
//    private Date lastLogged;
//
//}
