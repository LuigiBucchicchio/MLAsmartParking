package com.spmproject.smartparking.municipality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path = "municipality")
public class MunicipalityController {

    private final MunicipalityService municipalityService;

    @Autowired
    public MunicipalityController(MunicipalityService municipalityService) {
        this.municipalityService = municipalityService;
    }

    @PreAuthorize("hasAuthority('municipality:read')")
    @GetMapping
    public List<Municipality> getAllMunicipalities() {
        return municipalityService.getAllMunicipalities();
    }

    @PreAuthorize("hasAuthority('municipality:write')")
    @PostMapping
    public void registerNewMunicipality(@RequestBody Municipality municipality) {
        municipalityService.addNewMunicipality(municipality);
    }
}