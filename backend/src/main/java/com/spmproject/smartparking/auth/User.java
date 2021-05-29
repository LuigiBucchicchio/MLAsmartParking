package com.spmproject.smartparking.auth;

import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.annotation.Nullable;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


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


	@NotNull
	@Column(name = "email")
	@Email(regexp = ".+@.+\\..+", message = "*Please provide a valid Email")
	@NotEmpty(message = "*Please provide an email")
	private String email;

	private String username;

	@NotNull
	@NotEmpty(message = "*Please provide a Password")
	private String password;

	@Nullable
	private String token;

	@Column(name = "phone_number", nullable = false)
	private String phoneNumber;

	private ApplicationUserRole role;

	public User(String name, @Email(message = "*Please provide a valid Email") @NotEmpty(message = "*Please provide an email") String email, String username, @NotEmpty(message = "*Please provide your password") String password, String phoneNumber, ApplicationUserRole role) {
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.token = "";
		this.phoneNumber = phoneNumber;
		this.role = role;
	}
}
