package com.spmproject.smartparking.parkingPlace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityService;
import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;
import com.spmproject.smartparking.reservation.Reservation;

import java.util.HashSet;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "parking-place")
public class ParkingPlaceController {

	private final ParkingPlaceService parkingPlaceService;
	private final MunicipalityService municipalityService;
	private final ParkingSpotService parkingSpotService;

	@Autowired
	public ParkingPlaceController(ParkingPlaceService parkingPlaceService,MunicipalityService municipalityService
			, ParkingSpotService parkingSpotService) {
		this.parkingPlaceService = parkingPlaceService;
		this.municipalityService = municipalityService;
		this.parkingSpotService = parkingSpotService;
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/all")
	public List<ParkingPlace> getAllParkingPlaces() {
		return parkingPlaceService.getAllParkingPlaces();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
	@PostMapping("/add")
	public ParkingPlace newParkingPlace(@RequestParam int spotsNumber
			, @RequestParam String address, @RequestParam long municipalityID) {
		ParkingPlace p= new ParkingPlace();
		Municipality m= municipalityService.getMunicipality(municipalityID);
		p.setAddress(address);
		p.setSpotsNumber(spotsNumber);
		for(int i=0;i<spotsNumber;i++) {
			ParkingSpot s = new ParkingSpot();
			s.setLevel(0);
			s.setParkingPlaceID(p.getId());
			s.setProgressiveNumber(i+1);
			s.setReservations(new HashSet<Reservation>());
			parkingSpotService.addNewParkingSpot(s);
		}
		p.setMunicipality(m);
		return parkingPlaceService.addNewParkingPlace(p);
	}

}
