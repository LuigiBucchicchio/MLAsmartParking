package com.spmproject.smartparking.policeman;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.ItemNotFoundException;

@RestController
public class PolicemanController {
	
	 @Autowired
	  private PolicemanRepository policemanRepository;
	 
	  @GetMapping("/policeman/all")
	  List<Policeman> all() {
	    return (List<Policeman>) policemanRepository.findAll();
	  }

	  @PostMapping("/policeman")
	  Policeman newPoliceman(@RequestParam String name
		      , @RequestParam String surname, @RequestParam String phoneNumber , @RequestParam String email
		      , @RequestParam String password) {
		Policeman p= new Policeman();
		p.setName(name);
		p.setEmail(email);
		p.setPhoneNumber(phoneNumber);
		p.setSurname(surname);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		p.setPassword(passwordEncoder.encode(password));
	    return policemanRepository.save(p);
	  }
	  
	  @GetMapping("/policeman/{id}")
	  Policeman one(@PathVariable Long id) {
	    return policemanRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	  }

	  @PutMapping("/policeman/{id}")
	  Policeman replacePoliceman(@RequestBody Policeman newPoliceman, @PathVariable Long id){
	  Policeman p = policemanRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	  
	  if(!(p.getName().equals(newPoliceman.getName())))
	  p.setName(newPoliceman.getName());
	  
	  if(!(p.getEmail().equals(newPoliceman.getEmail())))
	  p.setEmail(newPoliceman.getEmail());
	  
	  if(!(p.getPhoneNumber().equals(newPoliceman.getPhoneNumber())))
	  p.setPhoneNumber(newPoliceman.getPhoneNumber());
	  
	  if(!(p.getSurname().equals(newPoliceman.getSurname())))
	  p.setSurname(newPoliceman.getSurname());
	  
	  BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	  if(!(passwordEncoder.matches(newPoliceman.getPassword(), p.getPassword())))
	  p.setPassword(passwordEncoder.encode(newPoliceman.getPassword()));
	  return p;
	  }

	  @DeleteMapping("/policeman/{id}")
	  void deletePoliceman(@PathVariable Long id) {
	    policemanRepository.deleteById(id);
	  }
	}
