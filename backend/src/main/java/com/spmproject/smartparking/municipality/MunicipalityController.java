package com.spmproject.smartparking.municipality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
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
	public void registerNewMunicipality(@RequestBody MunicipalityPayload payload) {
		
		Municipality m= new Municipality();
		m.setName(payload.getName());
		m.setUsername(payload.getUsername());
		m.setEmail(payload.getEmail());
		m.setPhoneNumber(payload.getPhoneNumber());

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		m.setPassword(passwordEncoder.encode(payload.getPassword()));

		municipalityService.addNewMunicipality(m);
	}
}