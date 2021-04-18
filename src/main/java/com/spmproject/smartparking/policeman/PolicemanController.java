package com.spmproject.smartparking.policeman;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PolicemanController {
	
	 @Autowired
	  private PolicemanRepository policemanRepository;
	 
	  @GetMapping("/policeman/all")
	  List<Policeman> all() {
	    return (List<Policeman>) policemanRepository.findAll();
	  }

	  @PostMapping("/policeman")
	  Policeman newPoliceman(@RequestBody Policeman newPoliceman) {
	    return policemanRepository.save(newPoliceman);
	  }
	  
	  @GetMapping("/policeman/{id}")
	  Optional<Policeman> one(@PathVariable Long id) {
	    return policemanRepository.findById(id);
	  }

	  @PutMapping("/policeman/{id}")
	  Optional<Policeman> replacePoliceman(@RequestBody Policeman newPoliceman, @PathVariable Long id){
	  Optional<Policeman> p = policemanRepository.findById(id);
	  
	  if(!(p.get().getName().equals(newPoliceman.getName())))
	  p.get().setName(newPoliceman.getName());
	  
	  if(!(p.get().getEmail().equals(newPoliceman.getEmail())))
	  p.get().setEmail(newPoliceman.getEmail());
	  
	  if(!(p.get().getPhoneNumber().equals(newPoliceman.getPhoneNumber())))
	  p.get().setPhoneNumber(newPoliceman.getPhoneNumber());
	  
	  if(!(p.get().getSurname().equals(newPoliceman.getSurname())))
	  p.get().setSurname(newPoliceman.getSurname());
	  
	  BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	  if(!(passwordEncoder.matches(newPoliceman.getPassword(), p.get().getPassword())))
	  p.get().setPassword(passwordEncoder.encode(newPoliceman.getPassword()));
	  return p;
	  }

	  @DeleteMapping("/policeman/{id}")
	  void deletePoliceman(@PathVariable Long id) {
	    policemanRepository.deleteById(id);
	  }
	}
