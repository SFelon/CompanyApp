package com.example.company.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class DepartmentRequest {

    @NotBlank
    @Size(min = 3, max = 40)
    private String departmentName;

    @NotBlank
    @Size(min = 3, max = 30)
    private String city;

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}

