package com.spmproject.smartparking.municipality;


import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.security.ApplicationUserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import static com.spmproject.smartparking.security.ApplicationUserRole.*;

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
    public List<Municipality> getMunicipalities() {
        return municipalityService.getMunicipalities();
    }

    @PreAuthorize("hasAuthority('municipality:write')")
    @PostMapping
    public void registerNewMunicipality(@RequestBody Municipality municipality) {
        municipalityService.addNewMunicipality(municipality);
    }
}