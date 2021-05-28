package com.spmproject.smartparking.driver;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path="driver")
public class DriverController {

	private DriverService driverService;

	@Autowired
	public DriverController(DriverService driverService) {
		this.driverService=driverService;
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
	@PostMapping("/add")
	public String addNewDriver (@RequestBody DriverPayload payload) {
		
		Driver n = new Driver();
		n.setName(payload.getName());
		n.setSurname(payload.getSurname());
		n.setEmail(payload.getEmail());
		n.setUsername(payload.getUsername());
		n.setPhoneNumber(payload.getPhoneNumber());
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		n.setPassword(passwordEncoder.encode(payload.getPassword()));
		
		Driver saved= driverService.addNewDriver(n);
		return saved.toString();
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/all")
	public List<Driver> getAllDrivers() {
		return driverService.getAllDrivers();
	}
}
