package com.spmproject.smartparking.municipality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;

@Service
public class MunicipalityService {

	private final MunicipalityRepository municipalityRepository;

	@Autowired
	public MunicipalityService(MunicipalityRepository municipalityRepository) {
		this.municipalityRepository = municipalityRepository;
	}

	public List<Municipality> getAllMunicipalities() {
		return municipalityRepository.findAll();
	}

	public Municipality getMunicipality(long id) {
		return municipalityRepository.findById(id).orElseThrow(()-> new ItemNotFoundException(id));
	}

	public void addNewMunicipality(Municipality municipality) {
		System.out.println(municipality);
	}
}

