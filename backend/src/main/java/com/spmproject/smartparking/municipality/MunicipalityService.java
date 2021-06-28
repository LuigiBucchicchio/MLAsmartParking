package com.spmproject.smartparking.municipality;

import com.spmproject.smartparking.driver.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;

@Service
public class MunicipalityService {
    private final MunicipalityRepository municipalityRepository;
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public MunicipalityService(MunicipalityRepository municipalityRepository) {
        this.municipalityRepository = municipalityRepository;
    }

    public List<Municipality> getAllMunicipalities() {
        return municipalityRepository.findAll();
    }

    public Municipality getMunicipality(long id) {
        return municipalityRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
    }

    public Boolean existingMunicipality(String email) {
        return municipalityRepository.existsByEmail(email);
    }

    public Municipality addNewMunicipality(Municipality m) {
        Municipality municipality = new Municipality(
                m.getName(),
                m.getEmail(),
                m.getUsername(),
                passwordEncoder.encode(m.getPassword()),
                m.getPhoneNumber()
        );

        return this.municipalityRepository.save(municipality);
    }

    public Municipality getMunicipality(String username) {
        return municipalityRepository.findByUsername(username).orElseThrow(() -> new ItemNotFoundException(username));
    }

    public Municipality getMunicipalityByDistrictCode(String districtCode) {
        return municipalityRepository.findByDistrictCode(districtCode).orElseThrow(() -> new ItemNotFoundException(districtCode));
    }
}

