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
    public ResponseEntity<Municipality> registerNewMunicipality(@RequestBody MunicipalityPayload payload) {
        System.out.println("register new muni");
        if (payload.getPassword() != null && payload.getEmail() != null && payload.getName() != null && payload.getPhoneNumber() != null && payload.getUsername() != null) {
            if (!payload.getPhoneNumber().isEmpty() || !payload.getName().isEmpty() || !payload.getEmail().isEmpty() || !payload.getPassword().isEmpty()) {
                System.out.println(payload);
                if (!municipalityService.existingMunicipality(payload.getEmail())) {
                    System.out.println("Dentro al salvataggio");
                    Municipality m = new Municipality();
                    m.setPolicemenList(new HashSet<Policeman>());
                    m.setName(payload.getName());
                    m.setUsername(payload.getUsername());
                    m.setEmail(payload.getEmail());
                    m.setPhoneNumber(payload.getPhoneNumber());
                    m.setPassword(payload.getPassword());

                    municipalityService.addNewMunicipality(m);
                    return new ResponseEntity<>(m, HttpStatus.OK);
                } else {
                    System.out.println(("l'eroror"));
                    return new ResponseEntity(HttpStatus.CONFLICT);
                }
            }
        }
        return new ResponseEntity(HttpStatus.CONFLICT);
    }
}