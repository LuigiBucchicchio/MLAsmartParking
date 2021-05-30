package com.spmproject.smartparking.parkingspot;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
	
	List<ParkingSpot> findByParkingPlaceID(Long parkingPlaceID);
	
	List<ParkingSpot> findByIsFreeAndParkingPlaceID(boolean isFree, Long parkingPlaceID);

}
