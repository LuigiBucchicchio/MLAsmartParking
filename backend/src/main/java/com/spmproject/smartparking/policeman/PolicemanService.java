package com.spmproject.smartparking.policeman;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;

@Service
public class PolicemanService {
	private final PolicemanRepository policemanRepository;

	@Autowired
	public PolicemanService(PolicemanRepository policemanRepository) {
		this.policemanRepository = policemanRepository;
	}

	public List<Policeman> getAllPolicemen() {
		return policemanRepository.findAll();
	}

	public Policeman addNewPoliceman(Policeman p) {
		return this.policemanRepository.save(p);
	}

	public Policeman One(long id) {
		return policemanRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	}

	public void deleteById(Long id) {
		policemanRepository.deleteById(id);
	}

	public Policeman update(Policeman p) {
		return policemanRepository.save(p);
	}
}
