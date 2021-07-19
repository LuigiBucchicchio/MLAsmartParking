package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverService;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;
import com.spmproject.smartparking.reservation.Reservation;
import com.spmproject.smartparking.reservation.ReservationPayload;
import com.spmproject.smartparking.reservation.ReservationRepository;
import com.spmproject.smartparking.reservation.ReservationService;
import com.spmproject.smartparking.vehicle.Vehicle;
import com.spmproject.smartparking.vehicle.VehicleService;
import com.spmproject.smartparking.vehicle.VehicleType;


@SpringBootTest
public class ReservationTest {
	

		    @Autowired
		    private ReservationService reservationService;
		    
		    @Autowired
		    private ReservationRepository reservationRepository;
		    
		    @Autowired
		    private ParkingSpotService parkingSpotService;
		    
		    @Autowired
		    private VehicleService vehicleService;
		    
		    @Autowired
		    private DriverService driverService;

		    
		@Test
		void reservationLifeCycle() {
			
			//born
			
			ReservationPayload rp = new ReservationPayload();
			rp.setStartingTime(new Timestamp(System.currentTimeMillis()));
			rp.setEndingTime(new Timestamp(System.currentTimeMillis()));
			rp.setVehiclePlate("FZ444AN");
			
			Reservation r = new Reservation();
			r.setParkingSpot(parkingSpotService.getAllParkingSpots().get(0));
			r.setStartingTime(rp.getStartingTime());
			r.setEndingTime(rp.getEndingTime());
			Vehicle v = new Vehicle();
			v.setBrand("ciaone");
			v.setType(VehicleType.CAR);
			v.setVehiclePlate(rp.getVehiclePlate());
			vehicleService.addNewVehicle(v);
			r.setVehicle(vehicleService.one(rp.getVehiclePlate()));
			
			
			Reservation saved= reservationService.addNewReservation(r);
			
			assertNotNull(saved.getId());
			assertNotNull(saved.getEndingTime());
			assertNotNull(saved.getStartingTime());
			assertNotNull(saved.getParkingSpot());
			assertNotNull(saved.getVehicle());
			//grow
			
			for(int i=0;i<100;i++) {
				i=i+1-1;
			}
			
			assertTrue((new Timestamp(System.currentTimeMillis()).after(saved.getEndingTime())));
			
			//notAlive
			
			reservationService.deleteReservation(saved.getId());
			vehicleService.deleteById(rp.getVehiclePlate());
			
			assertFalse(reservationRepository.findById(saved.getId()).isPresent());
		}
}
