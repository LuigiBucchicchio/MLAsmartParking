package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityService;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.parkingPlace.ParkingPlacePayload;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceService;

@SpringBootTest
public class ParkingPlaceTest {

	    @Autowired
	    private MunicipalityService municipalityService;

	    @Autowired
	    private ParkingPlaceService parkingPlaceService;
	    
	@Test
	void parkingPlaceGeneration() {
		
		ParkingPlacePayload payload = new ParkingPlacePayload();
		payload.setAddress("default address");
		payload.setSpotsNumber(69); //lmao
		
		ParkingPlace p= new ParkingPlace();
		String address= payload.getAddress();
		int spotsNumber = payload.getSpotsNumber();
		p.setAddress(address);
		p.setSpotsNumber(spotsNumber);
		
		Municipality m= municipalityService.getMunicipality((long)1);
		p.setMunicipality(m);
		
		ParkingPlace saved= parkingPlaceService.addNewParkingPlace(p);
		
		assertNotNull(saved);
		assertNotNull(saved.getAddress());
		assertNotNull(saved.getMunicipality());
		assertNotNull(saved.getParkingPlaceID());
		assertNotNull(saved.getSpotsNumber());
		
		parkingPlaceService.removeParkingPlace(saved.getParkingPlaceID());
	}
}
