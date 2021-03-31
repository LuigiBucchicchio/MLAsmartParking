package com.spmproject.smartparking.municipality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void getMunicipality() {
        //return municipalityRepository.findById(getMunicipality().getId());
    }

    public void addNewMunicipality(Municipality municipality) {
        System.out.println(municipality);
    }
}

