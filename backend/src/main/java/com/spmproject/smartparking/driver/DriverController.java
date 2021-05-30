package com.spmproject.smartparking.driver;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.spmproject.smartparking.vehicle.Vehicle;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path="driver")
public class DriverController {

	private DriverService driverService;

	@Autowired
	public DriverController(DriverService driverService) {
		this.driverService=driverService;
	}

	@PostMapping("/register")
	public ResponseEntity registerUser(@RequestBody Driver newUser) {
		List<Driver> drivers = driverService.getAllDrivers();
		System.out.println("New user: " + newUser.toString());
		for (Driver driver : drivers) {
			System.out.println("Registered user: " + newUser.toString());
			if (driver.equals(newUser)) {
				System.out.println("User Already exists!");
				return new ResponseEntity(HttpStatus.CONFLICT);
			}
		}
		driverService.addNewDriver(newUser);
		return new ResponseEntity(HttpStatus.OK);
	}

	@PostMapping("/add")
	public String addNewDriver (@RequestBody Driver driver) {

		Driver n = new Driver();
		n.setName(driver.getName());
		n.setSurname(driver.getSurname());
		n.setEmail(driver.getEmail());
		n.setPhoneNumber(driver.getPhoneNumber());
		n.setPassword(driver.getPassword());
		n.setVehicle_owned(new HashSet<Vehicle>());
		return driverService.addNewDriver(n).toString();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/all")
	public List<Driver> getAllDrivers() {
		return driverService.getAllDrivers();
	}
}