package com.spmproject.smartparking.driver;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriverRepository  extends JpaRepository<Driver, Long> {
    Boolean existsByEmail(String email);
}
