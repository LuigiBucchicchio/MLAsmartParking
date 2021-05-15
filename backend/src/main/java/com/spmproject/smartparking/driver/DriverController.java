package com.spmproject.smartparking.driver;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

	@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
	@PostMapping("/add")
	public String addNewDriver (@RequestParam String name
			, @RequestParam String surname, @RequestParam String phoneNumber , @RequestParam String email
			, @RequestParam String password) {

		Driver n = new Driver();
		n.setName(name);
		n.setSurname(surname);
		n.setEmail(email);
		n.setPhoneNumber(phoneNumber);
		n.setPassword(password);
		n.setVehicle_owned(new HashSet<Vehicle>());
		return driverService.addNewDriver(n).toString();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/all")
	public List<Driver> getAllDrivers() {
		return driverService.getAllDrivers();
	}
}
