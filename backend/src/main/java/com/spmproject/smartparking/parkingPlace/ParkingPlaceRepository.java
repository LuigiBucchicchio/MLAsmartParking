package com.spmproject.smartparking.parkingPlace;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ParkingPlaceRepository extends JpaRepository<ParkingPlace, Long> {
	 <Optional>ParkingPlace findByAddress(String address);
	 List<ParkingPlace> findByMunicipalityId(long municipalityId);
}
