package com.spmproject.smartparking.municipality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.spmproject.smartparking.policeman.Policeman;

import java.util.HashSet;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "municipality")
public class MunicipalityController {

    private final MunicipalityService municipalityService;

    @Autowired
    public MunicipalityController(MunicipalityService municipalityService) {
        this.municipalityService = municipalityService;
    }

    //@PreAuthorize("hasAuthority('municipality:read')")
    @GetMapping("/all")
    public List<Municipality> getAllMunicipalities() {
        return municipalityService.getAllMunicipalities();
    }

    //@PreAuthorize("hasAuthority('municipality:write')")
    @PostMapping("/add")
    public ResponseEntity registerNewMunicipality(@RequestBody MunicipalityPayload payload) {
        if (!municipalityService.existingMunicipality(payload.getEmail())) {
            Municipality m = new Municipality();
            m.setPolicemenList(new HashSet<Policeman>());
            m.setName(payload.getName());
            m.setUsername(payload.getUsername());
            m.setEmail(payload.getEmail());
            m.setPhoneNumber(payload.getPhoneNumber());
            m.setPassword(payload.getPassword());

            municipalityService.addNewMunicipality(m);
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }
}