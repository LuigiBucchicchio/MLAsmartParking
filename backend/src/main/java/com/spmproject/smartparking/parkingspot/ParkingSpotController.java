package com.spmproject.smartparking.parkingspot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ParkingSpotController {

	private ParkingSpotService parkingSpotService;
	@Autowired
	public ParkingSpotController(ParkingSpotService parkingSpotService) {
		this.parkingSpotService=parkingSpotService;
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("parking-spot/all")
	public List<ParkingSpot> getAllParkingSpot() {
		return parkingSpotService.getAllParkingSpots();
	}
	
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
		@GetMapping("parking-place/{id}/parking-spot/all")
		public List<ParkingSpot> getAllParkingSpotFromPlace(@PathVariable Long id) {
			return parkingSpotService.getParkingSpotsFromPlace(id);
		}
	
}
