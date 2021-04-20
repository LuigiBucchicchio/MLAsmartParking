package com.spmproject.smartparking.parkingspot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ParkingSpotController {
	
	@Autowired
	private ParkingSpotRepository parkingSpotRepository;
	
	    @PreAuthorize("hasRole('ROLE_ADMIN')")
	    @GetMapping("parking-spot/all")
	    public List<ParkingSpot> getAllParkingSpot() {
	        return (List<ParkingSpot>) parkingSpotRepository.findAll();
	    }
}
