package com.example.company.payload;

import java.util.Date;

public class UserProfile {

    private String firstName;
    private String lastName;
    private String email;
    private String privatePhone;
    private String businessPhone;
    private Date dateOfEmployment;
    private boolean isAccountActive;
    private Date lastLogged;
    private String departmentName;

    public UserProfile() {
    }

    public UserProfile(String firstName, String lastName, String email, String privatePhone, String businessPhone,
                       Date dateOfEmployment, boolean isAccountActive, Date lastLogged, String departmentName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.privatePhone = privatePhone;
        this.businessPhone = businessPhone;
        this.dateOfEmployment = dateOfEmployment;
        this.isAccountActive = isAccountActive;
        this.lastLogged = lastLogged;
        this.departmentName = departmentName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPrivatePhone() {
        return privatePhone;
    }

    public void setPrivatePhone(String privatePhone) {
        this.privatePhone = privatePhone;
    }

    public String getBusinessPhone() {
        return businessPhone;
    }

    public void setBusinessPhone(String businessPhone) {
        this.businessPhone = businessPhone;
    }

    public Date getDateOfEmployment() {
        return dateOfEmployment;
    }

    public void setDateOfEmployment(Date dateOfEmployment) {
        this.dateOfEmployment = dateOfEmployment;
    }

    public boolean isAccountActive() {
        return isAccountActive;
    }

    public void setAccountActive(boolean accountActive) {
        isAccountActive = accountActive;
    }

    public Date getLastLogged() {
        return lastLogged;
    }

    public void setLastLogged(Date lastLogged) {
        this.lastLogged = lastLogged;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}
