package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverPayload;
import com.spmproject.smartparking.driver.DriverRepository;
import com.spmproject.smartparking.driver.DriverService;


@SpringBootTest
public class DriverTest {
	

		    @Autowired
		    private DriverService driverService;
		    
		    @Autowired
		    private DriverRepository driverRepository;

		    
		@Test
		void driverLifeCycle() {
			
			//born
			
			DriverPayload payload = new DriverPayload();
			payload.setEmail("Nzino@ilTunisino.com");
			payload.setName("Hamzino");
			payload.setSurname("Sarrattino");
			payload.setUsername("XAAHAHAM");
			payload.setPassword("secretato");
			payload.setPhoneNumber("02637845555");
			
			Driver n = new Driver();
			n.setName(payload.getName());
			n.setSurname(payload.getSurname());
			n.setEmail(payload.getEmail());
			n.setUsername(payload.getUsername());
			n.setPhoneNumber(payload.getPhoneNumber());
			n.setPassword(payload.getPassword());

			Driver saved= driverService.addNewDriver(n);
			
			assertNotNull(saved.getId());
			assertNotNull(saved.getEmail());
			assertNotNull(saved.getName());
			assertNotNull(saved.getPassword());
			assertNotNull(saved.getPhoneNumber());
			assertNotNull(saved.getSurname());
			assertNotNull(saved.getUsername());
			
			//grow
			
			String newSurname = "bellino";
			Driver existingDriver = driverService.one(saved.getId());
			existingDriver.setSurname(newSurname);
			driverService.update(existingDriver);
			Driver newDriver = driverService.one(saved.getId());
			assertTrue(newDriver.getSurname().equals(newSurname));
			
			//notAlive
			
			driverService.remove(saved.getId());
			assertFalse(driverRepository.findById(saved.getId()).isPresent());
		}
}
