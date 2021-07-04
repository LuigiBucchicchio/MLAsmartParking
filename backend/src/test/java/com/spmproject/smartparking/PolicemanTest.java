package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceService;
import com.spmproject.smartparking.policeman.Policeman;
import com.spmproject.smartparking.policeman.PolicemanPayload;
import com.spmproject.smartparking.policeman.PolicemanRepository;
import com.spmproject.smartparking.policeman.PolicemanService;


@SpringBootTest
public class PolicemanTest {
	

		    @Autowired
		    private PolicemanService policemanService;
		    
		    @Autowired
		    private ParkingPlaceService parkingPlaceService;
		    
		    @Autowired
		    private PolicemanRepository policemanRepository;

		    
		@Test
		void policemanLifeCycle() {
			
			//born
			
			PolicemanPayload payload = new PolicemanPayload();
			payload.setEmail("Nzino@ilTunisino.com");
			payload.setName("Hamzino");
			payload.setSurname("Sarrattino");
			payload.setUsername("XAAHAHAM");
			payload.setPassword("secretato");
			payload.setPhoneNumber("02637845555");
			payload.setDistrictCode("6563");
			
			Policeman n = new Policeman();
			n.setName(payload.getName());
			n.setSurname(payload.getSurname());
			n.setEmail(payload.getEmail());
			n.setUsername(payload.getUsername());
			n.setPhoneNumber(payload.getPhoneNumber());
			n.setPassword(payload.getPassword());

			Policeman saved=  policemanService.addNewPoliceman(n);
			
			assertNotNull(saved.getId());
			assertNotNull(saved.getEmail());
			assertNotNull(saved.getName());
			assertNotNull(saved.getPassword());
			assertNotNull(saved.getPhoneNumber());
			assertNotNull(saved.getSurname());
			assertNotNull(saved.getUsername());
			
			//grow
			
			ParkingPlace p= parkingPlaceService.getOneByAddress("via mario milano");
			
			Policeman existingPoliceman = policemanService.One(saved.getId());
			existingPoliceman.setAssignedParkingPlace(p);
			policemanService.update(existingPoliceman);
			
			Policeman newPoliceman = policemanService.One(saved.getId());
			assertTrue(newPoliceman.getAssignedParkingPlace().getParkingPlaceID().equals(p.getParkingPlaceID()));
			
			//notAlive
			
			policemanRepository.deleteById(saved.getId());
			
			assertFalse(policemanRepository.findById(saved.getId()).isPresent());
		}
}
