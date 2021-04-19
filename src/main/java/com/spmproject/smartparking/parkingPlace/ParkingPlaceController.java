package com.spmproject.smartparking.parkingPlace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.ItemNotFoundException;
import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityService;
import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotRepository;
import com.spmproject.smartparking.reservation.Reservation;
import com.spmproject.smartparking.vehicle.Vehicle;
import com.spmproject.smartparking.vehicle.VehicleType;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "parking-place")
public class ParkingPlaceController {

    private final ParkingPlaceService parkingPlaceService;
    private final MunicipalityService municipalityService;
    private final ParkingSpotRepository parkingSpotRepository;

    @Autowired
    public ParkingPlaceController(ParkingPlaceService parkingPlaceService,MunicipalityService municipalityService
    		, ParkingSpotRepository parkingSpotRepository) {
        this.parkingPlaceService = parkingPlaceService;
        this.municipalityService = municipalityService;
        this.parkingSpotRepository = parkingSpotRepository;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(path ="/all")
    public List<ParkingPlace> getAllParkingPlaces() {
        return parkingPlaceService.getAllParkingPlaces();
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
	@PostMapping(path = "/add")
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
    		parkingSpotRepository.save(s);
    	}
    	p.setMunicipality(m);
		return parkingPlaceService.addNewParkingPlace(p);
	}

}
