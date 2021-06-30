package com.spmproject.smartparking.policeman;

import com.spmproject.smartparking.municipality.Municipality;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;

@Service
public class PolicemanService {
	private final PolicemanRepository policemanRepository;
	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	public PolicemanService(PolicemanRepository policemanRepository) {
		this.policemanRepository = policemanRepository;
	}

	public List<Policeman> getAllPolicemen() {
		return policemanRepository.findAll();
	}

	public Policeman addNewPoliceman(Policeman p) {
		Policeman policeman = new Policeman(
				p.getName(),
				p.getSurname(),
				p.getEmail(),
				p.getUsername(),
				passwordEncoder.encode(p.getPassword()),
				p.getPhoneNumber()
		);
		return this.policemanRepository.save(policeman);
	}

	// check if email already used in another registration
	public Boolean isEmailUsed(String email) {
		return  policemanRepository.existsByEmail(email);
	}

	public Policeman One(long id) {
		return policemanRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	}
	
	public Policeman getOneByName(String name) {
		return policemanRepository.findByName(name);
	}

	public void deleteById(Long id) {
		policemanRepository.deleteById(id);
	}

	public Policeman update(Policeman p) {
		return policemanRepository.save(p);
	}
	
	public List<Policeman> getPolicemenFromMunicipalityID(long id) {
		return policemanRepository.findByMunicipalityId(id);
	}

	public Policeman getOneByUsername(String currentUserName) {
		return policemanRepository.findByUsername(currentUserName);
	}
}
