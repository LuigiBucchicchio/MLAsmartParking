package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotRepository;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;


@SpringBootTest
public class ParkingSpotTest {
	

		    @Autowired
		    private ParkingSpotService parkingSpotService;
		    
		    @Autowired
		    private ParkingSpotRepository parkingSpotRepository;

		    
		@Test
		void ParkingSpotLifeCycle() {
			
			//born
			
			ParkingSpot ps = new ParkingSpot();
			ps.setLevel(0);
			ps.setParkingPlaceID((long)1);
			
			ps.setFree(true);
			
			ParkingSpot lastOne = parkingSpotService.getParkingSpotsFromPlace((long)1).get(parkingSpotService.getParkingSpotsFromPlace((long)1).size()-1);
			int prog = lastOne.getProgressiveNumber();
			ps.setProgressiveNumber(prog+1);
			
			ParkingSpot saved = parkingSpotService.addNewParkingSpot(ps);
			
			assertNotNull(saved.getId());
			assertNotNull(saved.getLevel());
			assertNotNull(saved.getParkingPlaceID());
			assertNotNull(saved.getProgressiveNumber());
			assertNotNull(saved.isFree());
			
			assertTrue(saved.isFree());
			
			//grow
			
			ParkingSpot old = parkingSpotService.one(saved.getId());
			
			old.setFree(false);
			
			parkingSpotRepository.save(old);
			
			ParkingSpot newPS = parkingSpotService.one(saved.getId());
			
			assertFalse(newPS.isFree());
			
			//notAlive
			parkingSpotRepository.deleteById(saved.getId());
			
			assertFalse(parkingSpotRepository.findById(saved.getId()).isPresent());
		}
}

