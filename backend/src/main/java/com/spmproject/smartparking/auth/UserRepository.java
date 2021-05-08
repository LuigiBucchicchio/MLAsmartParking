package com.spmproject.smartparking.auth;

import com.spmproject.smartparking.security.ApplicationUserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);

	public Optional<User> findByUsername(String email);

	public List<User> findByRole(ApplicationUserRole role);

	Boolean existsByUsername(String username);

	//User findByUsername(String username);
}
