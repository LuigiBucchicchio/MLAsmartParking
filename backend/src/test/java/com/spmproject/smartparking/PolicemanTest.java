package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityRepository;
import com.spmproject.smartparking.municipality.MunicipalityService;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceRepository;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceService;
import com.spmproject.smartparking.policeman.Policeman;
import com.spmproject.smartparking.policeman.PolicemanPayload;
import com.spmproject.smartparking.policeman.PolicemanRepository;
import com.spmproject.smartparking.policeman.PolicemanService;
import com.spmproject.smartparking.security.ApplicationUserRole;


@SpringBootTest
public class PolicemanTest {
	

		    @Autowired
		    private PolicemanService policemanService;
		    
		    @Autowired
		    private ParkingPlaceRepository parkingPlaceRepository;
		    
		    @Autowired
		    private PolicemanRepository policemanRepository;
		    
		    @Autowired
		    private MunicipalityService municipalityService;
		    
		    @Autowired
		    private MunicipalityRepository municipalityRepository;


		    
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
			
			Municipality m= municipalityService.getMunicipality((long)1);
			m.setDistrictCode("6563");
			municipalityRepository.save(m);
			
			Policeman n = new Policeman();
			n.setMunicipality(m);
			
            n.setName(payload.getName());
            n.setSurname(payload.getSurname());
            n.setEmail(payload.getEmail());
            n.setUsername(payload.getUsername());
            n.setPhoneNumber(payload.getPhoneNumber());
            n.setRole(ApplicationUserRole.POLICEMAN);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            n.setPassword(passwordEncoder.encode(payload.getPassword()));

			Policeman saved=  policemanRepository.save(n);
			
			assertNotNull(saved.getId());
			assertNotNull(saved.getEmail());
			assertNotNull(saved.getName());
			assertNotNull(saved.getPassword());
			assertNotNull(saved.getPhoneNumber());
			assertNotNull(saved.getSurname());
			assertNotNull(saved.getUsername());
			
			//grow
			
			ParkingPlace p= parkingPlaceRepository.findById((long)1).orElseThrow(() -> new ItemNotFoundException((long)1));
			
			Policeman existingPoliceman = policemanService.One(saved.getId());
			existingPoliceman.setAssignedParkingPlace(p);
			policemanRepository.save(existingPoliceman);
			
			Policeman newPoliceman = policemanService.One(saved.getId());
			assertTrue(newPoliceman.getAssignedParkingPlace().getParkingPlaceID().equals(p.getParkingPlaceID()));
			
			//notAlive
			
			policemanRepository.deleteById(saved.getId());
			
			assertFalse(policemanRepository.findById(saved.getId()).isPresent());
		}
}
