package com.spmproject.smartparking.parkingPlace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityService;
import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;
import com.spmproject.smartparking.reservation.Reservation;

import java.util.HashSet;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
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

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/all")
	@ResponseBody
	public List<ParkingPlace> getAllParkingPlaces() {
		return parkingPlaceService.getAllParkingPlaces();
	}
	
	//@PreAuthorize("hasAuthority('parkingPlace:write')")
	@PostMapping("/add")
	public ParkingPlace newParkingPlace(@RequestBody ParkingPlacePayload payload) {
		
		int spotsNumber= payload.getSpotsNumber();
		String address = payload.getAddress();
		ParkingPlace p= new ParkingPlace();
		
		/*try to get Municipality from context
		 String username="";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
		  username = ((UserDetails)principal).getUsername();
		} else {
		  username = principal.toString();
		}
		Municipality m= municipalityService.getMunicipality(username);
		*/
		
		Municipality m= municipalityService.getMunicipality((long)1);
		p.setAddress(address);
		p.setSpotsNumber(spotsNumber);
		p.setMunicipality(m);
		ParkingPlace saved = parkingPlaceService.addNewParkingPlace(p);
		for(int i=0;i<spotsNumber;i++) {
			ParkingSpot s = new ParkingSpot();
			s.setLevel(0);
			s.setParkingPlaceID(p.getParkingPlaceID());
			s.setProgressiveNumber(i+1);
			s.setReservations(new HashSet<Reservation>());
			parkingSpotService.addNewParkingSpot(s);
		}
		return saved;
	}

}
