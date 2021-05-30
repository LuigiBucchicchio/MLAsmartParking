package com.spmproject.smartparking.municipality;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MunicipalityRepository extends JpaRepository<Municipality, Long> {

	Optional<Municipality> findByUsername(String username);
}
