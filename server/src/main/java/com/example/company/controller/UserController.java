package com.example.company.controller;

import com.example.company.exception.ResourceNotFoundException;
import com.example.company.model.User;
import com.example.company.payload.UserProfile;
import com.example.company.payload.UserResponse;
import com.example.company.repository.UserRepository;
import com.example.company.security.CurrentUser;
import com.example.company.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ROLE_CEO','ROLE_HEAD','ROLE_EMPLOYEE')")
    public UserResponse getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserResponse userResponse = new UserResponse(currentUser.getId(), currentUser.getUsername(),
                currentUser.getAuthorities());
        return userResponse;
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserProfile userProfile = new UserProfile(user.getFirstName(), user.getLastName(),
                user.getEmail(), user.getBusinessPhone() , user.getPrivatePhone(), user.getDateOfEmployment(), user.isAccountActive(),
                user.getLastLogged(), user.getDepartment().getDepartmentName());

        return userProfile;
    }

}
