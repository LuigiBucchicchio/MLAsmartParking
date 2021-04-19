package com.spmproject.smartparking.driver;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.vehicle.Vehicle;

public class DriverController {


	@RestController
	@RequestMapping(path="/driver")
	public class MainController {
	  @Autowired
	  private DriverRepository driverRepository;

	  @PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
	  @PostMapping(path="/add")
	  public String addNewUser (@RequestParam String name
	      , @RequestParam String surname, @RequestParam String phoneNumber , @RequestParam String email
	      , @RequestParam String password) {

	    Driver n = new Driver();
	    n.setName(name);
	    n.setSurname(surname);
	    n.setEmail(email);
	    n.setPhoneNumber(phoneNumber);
	    n.setPassword(password);
	    n.setVehicle_owned(new HashSet<Vehicle>());
	    return driverRepository.save(n).toString();
	  }

	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @GetMapping(path="/all")
	  public Iterable<Driver> getAllUsers() {
	    return driverRepository.findAll();
	  }
	}
}
