package com.spmproject.smartparking.driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

public class DriverController {


	@Controller
	@RequestMapping(path="/driver")
	public class MainController {
	  @Autowired
	  private DriverRepository userRepository;

	  @PostMapping(path="/add")
	  public @ResponseBody String addNewUser (@RequestParam String name
	      , @RequestParam String surname, @RequestParam String phoneNumber , @RequestParam String email
	      , @RequestParam String password) {

	    Driver n = new Driver();
	    n.setName(name);
	    n.setSurname(surname);
	    n.setEmail(email);
	    n.setPhoneNumber(phoneNumber);
	    n.setPassword(password);
	    userRepository.save(n);
	    return "Saved";
	  }

	  @GetMapping(path="/all")
	  public @ResponseBody Iterable<Driver> getAllUsers() {
	    return userRepository.findAll();
	  }
	}
}
