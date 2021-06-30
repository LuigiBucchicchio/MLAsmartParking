package com.spmproject.smartparking;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverService;
import com.spmproject.smartparking.vehicle.Vehicle;
import com.spmproject.smartparking.vehicle.VehiclePayload;
import com.spmproject.smartparking.vehicle.VehicleRepository;
import com.spmproject.smartparking.vehicle.VehicleService;
import com.spmproject.smartparking.vehicle.VehicleType;


@SpringBootTest
public class VehicleTest {
	

		    @Autowired
		    private DriverService driverService;
		    
		    @Autowired
		    private VehicleRepository vehicleRepository;
		    
		    @Autowired
		    private VehicleService vehicleService;

		    
		@Test
		void vehicleLifeCycle() {
			
			//born
			
			VehiclePayload payload = new VehiclePayload();
			
			payload.setBrand("NONE");
			payload.setType("Autovettura");
			payload.setVehiclePlate("ZZ444AA");
			
			Vehicle v = new Vehicle();
			v.setBrand(payload.getBrand());
			v.setType(VehicleType.AUTOVETTURA);
			v.setVehiclePlate(payload.getVehiclePlate());
			
			Vehicle saved = vehicleService.addNewVehicle(v);
			
			
			assertNotNull(saved.getBrand());
			assertNotNull(saved.getType());
			assertNotNull(saved.getVehiclePlate());
			
			//grow
			
			String newBrand = "LanciaLaLancia";
			Vehicle existingVehicle = vehicleService.one(payload.getVehiclePlate());
			existingVehicle.setBrand(newBrand);
			
			vehicleRepository.save(existingVehicle);
			
			Vehicle newVehicle = vehicleService.one(payload.getVehiclePlate());
			
			assertTrue(newVehicle.getBrand().equals(newBrand));
			
			//notAlive
			
			vehicleRepository.deleteById(payload.getVehiclePlate());
			assertFalse(vehicleRepository.findById(payload.getVehiclePlate()).isPresent());
		}
}