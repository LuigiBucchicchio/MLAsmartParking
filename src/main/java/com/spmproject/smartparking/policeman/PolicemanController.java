package com.spmproject.smartparking.policeman;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.ItemNotFoundException;

@RestController
public class PolicemanController {
	
	 @Autowired
	  private PolicemanRepository policemanRepository;
	 
	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @GetMapping("/policeman/all")
	  public List<Policeman> all() {
	    return (List<Policeman>) policemanRepository.findAll();
	  }

	  @PreAuthorize("hasRole('ROLE_ADMIN','ROLE_POLICEMAN')")
	  @PostMapping("/policeman/add")
	  public Policeman newPoliceman(@RequestParam String name
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
	  
	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @GetMapping("/policeman/{id}")
	  public Policeman one (@PathVariable Long id) {
	    return policemanRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	  }

	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @PutMapping("/policeman/{id}")
	  public Policeman replacePoliceman(@RequestParam String name
		      , @RequestParam String surname, @RequestParam String phoneNumber , @RequestParam String email
		      , @RequestParam String password, @PathVariable Long id){
	  Policeman p = policemanRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	  
	  if(!(p.getName().equals(name)))
	  p.setName(name);
	  
	  if(!(p.getEmail().equals(email)))
	  p.setEmail(email);
	  
	  if(!(p.getPhoneNumber().equals(phoneNumber)))
	  p.setPhoneNumber(phoneNumber);
	  
	  if(!(p.getSurname().equals(surname)))
	  p.setSurname(surname);
	  
	  BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	  if(!(passwordEncoder.matches(password, p.getPassword())))
	  p.setPassword(passwordEncoder.encode(password));
	  return p;
	  }

	  @PreAuthorize("hasRole('ROLE_ADMIN')")
	  @DeleteMapping("/policeman/{id}")
	  public void deletePoliceman(@PathVariable Long id) {
		policemanRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	    policemanRepository.deleteById(id);
	  }
	}
