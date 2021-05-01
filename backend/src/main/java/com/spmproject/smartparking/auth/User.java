package com.spmproject.smartparking.auth;

import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "user_email_unique", columnNames = "email")
        })
public class User {

    @Column(
            updatable = false
    )
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Column(name = "email")
    @Email(message = "*Please provide a valid Email")
    @NotEmpty(message = "*Please provide an email")
    private String email;

    private String username;

    @NotEmpty(message = "*Please provide your password")
    private String password;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    private ApplicationUserRole role;

    public User(String name, @Email(message = "*Please provide a valid Email") @NotEmpty(message = "*Please provide an email") String email, String username, @NotEmpty(message = "*Please provide your password") String password, String phoneNumber, ApplicationUserRole role) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }
}
