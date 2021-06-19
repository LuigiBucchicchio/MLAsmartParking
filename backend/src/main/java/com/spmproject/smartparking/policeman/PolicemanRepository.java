package com.spmproject.smartparking.policeman;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicemanRepository extends JpaRepository<Policeman,Long>{
    Boolean existsByEmail(String email);
}
