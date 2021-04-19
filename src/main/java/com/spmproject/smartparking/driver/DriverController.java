package com.spmproject.smartparking.driver;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.vehicle.Vehicle;

public class DriverController {


	@RestController
	@RequestMapping(path="/driver")
	public class MainController {
	  @Autowired
	  private DriverRepository driverRepository;

	  @PostMapping(path="/add")
	  //public String addNewUser (@ResponseBody Driver newDriver){
	  //driverRepository.save(newDriver);
	  //}
	  public @ResponseBody String addNewUser (@RequestParam String name
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

	  @GetMapping(path="/all")
	  public @ResponseBody Iterable<Driver> getAllUsers() {
	    return driverRepository.findAll();
	  }
	}
}
