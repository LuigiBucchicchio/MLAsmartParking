package com.spmproject.smartparking.policeman;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.municipality.MunicipalityService;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "policeman")
public class PolicemanController {

	private PolicemanService policemanService;
	private ParkingPlaceService parkingPlaceService;
	private MunicipalityService municipalityService;
	@Autowired
	public PolicemanController(PolicemanService policemanService,
			ParkingPlaceService parkingPlaceService, MunicipalityService municipalityService) {
		this.policemanService=policemanService;
		this.parkingPlaceService=parkingPlaceService;
		this.municipalityService=municipalityService;
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/all")
	public List<Policeman> all() {
		return policemanService.getAllPolicemen();
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_POLICEMAN')")
	@PostMapping("/add")
	public Policeman newPoliceman(@RequestBody PolicemanPayload payload) {
		
		Policeman p = new Policeman();
		
		// can we get it from context?
		p.setMunicipality(municipalityService.getMunicipalityByDistrictCode(payload.getDistrictCode()));
		
		p.setName(payload.getName());
		p.setSurname(payload.getSurname());
		p.setEmail(payload.getEmail());
		p.setUsername(payload.getUsername());
		p.setPhoneNumber(payload.getPhoneNumber());
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		p.setPassword(passwordEncoder.encode(payload.getPassword()));
		Policeman saved=policemanService.addNewPoliceman(p);
		return saved;
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/{id}")
	public Policeman one(@PathVariable Long id) {
		return policemanService.One(id);
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public Policeman replacePoliceman(@RequestBody PolicemanPayload payload, @PathVariable Long id) {
		Policeman p = policemanService.One(id);

		if (!(p.getName().equals(payload.getName())))
			p.setName(payload.getName());

		if (!(p.getEmail().equals(payload.getEmail())))
			p.setEmail(payload.getEmail());

		if (!(p.getUsername().equals(payload.getUsername())))
			p.setUsername(payload.getUsername());

		if (!(p.getPhoneNumber().equals(payload.getPhoneNumber())))
			p.setPhoneNumber(payload.getPhoneNumber());

		if (!(p.getSurname().equals(payload.getSurname())))
			p.setSurname(payload.getSurname());

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if (!(passwordEncoder.matches(payload.getPassword(), p.getPassword())))
			p.setPassword(passwordEncoder.encode(payload.getPassword()));
		
		return policemanService.update(p);
	}
	
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
		@PutMapping("/{id}/{parkingPlaceID}/assign")
		public Policeman assignPoliceman(@PathVariable Long id, @PathVariable Long parkingPlaceID) {
			Policeman p = policemanService.One(id);
			ParkingPlace pp= parkingPlaceService.one(parkingPlaceID);
            p.setAssignedParkingPlace(pp);
			return policemanService.update(p);
		}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public void deletePoliceman(@PathVariable Long id) {
		policemanService.One(id);
		policemanService.deleteById(id);
	}
}
