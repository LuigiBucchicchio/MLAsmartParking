package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityPayload;
import com.spmproject.smartparking.municipality.MunicipalityRepository;
import com.spmproject.smartparking.municipality.MunicipalityService;


@SpringBootTest
public class MunicipalityTest {
	

		    @Autowired
		    private MunicipalityService municipalityService;
		    
		    @Autowired
		    private MunicipalityRepository municipalityRepository;

		    
		@Test
		void municipalityLifeCycle() {
			
			//born
			
			MunicipalityPayload payload = new MunicipalityPayload();
			payload.setEmail("albero@bello.com");
			payload.setName("Alberobello");
			payload.setUsername("Comune Alberobello");
			payload.setPassword("secretato");
			payload.setPhoneNumber("02637845666");
			
			Municipality n = new Municipality();
			n.setName(payload.getName());
			n.setEmail(payload.getEmail());
			n.setUsername(payload.getUsername());
			n.setPhoneNumber(payload.getPhoneNumber());
			n.setPassword(payload.getPassword());

			Municipality saved= municipalityService.addNewMunicipality(n);
			
			assertNotNull(saved.getId());
			assertNotNull(saved.getEmail());
			assertNotNull(saved.getName());
			assertNotNull(saved.getPassword());
			assertNotNull(saved.getPhoneNumber());
			assertNotNull(saved.getUsername());
			
			//grow
			
			String newName = "AlberoNonMoltoBello";
			Municipality existingMunicipality = municipalityService.getMunicipality(saved.getId());
			existingMunicipality.setName(newName);
			
			municipalityRepository.save(existingMunicipality);
			
			Municipality newMunicipality = municipalityService.getMunicipality(saved.getId());
			assertTrue(newMunicipality.getName().equals(newName));
			
			//notAlive
			
			municipalityRepository.deleteById(saved.getId());
			assertFalse(municipalityRepository.findById(saved.getId()).isPresent());
		}
}