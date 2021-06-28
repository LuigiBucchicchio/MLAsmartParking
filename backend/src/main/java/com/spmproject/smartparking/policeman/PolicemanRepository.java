package com.spmproject.smartparking.policeman;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicemanRepository extends JpaRepository<Policeman, Long> {
    Boolean existsByEmail(String email);

    List<Policeman> findByMunicipalityId(long id);

    Policeman findByName(String name);
}
