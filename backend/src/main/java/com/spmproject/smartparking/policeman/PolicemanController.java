package com.spmproject.smartparking.policeman;

import java.util.HashSet;
import java.util.List;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.spmproject.smartparking.security.ApplicationUserRole;

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
        this.policemanService = policemanService;
        this.parkingPlaceService = parkingPlaceService;
        this.municipalityService = municipalityService;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<Policeman> all() {
        return policemanService.getAllPolicemen();
    }

    @GetMapping("/all/municipality")
    public List<Policeman> municipalityPolicemen() {
        String currentUserName="";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            currentUserName = authentication.getName();
        }

        Municipality m= municipalityService.getMunicipality(currentUserName);
        List<Policeman> list = policemanService.getPolicemenFromMunicipalityID(m.getId());
        return list;
    }

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/me")
	public Policeman one() {
		String currentUserName="";
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
		    currentUserName = authentication.getName();
		}
		System.out.println("currentUsername : "+currentUserName);
		Policeman p= policemanService.getOneByUsername(currentUserName);
		return p;
	}


    @PostMapping("/add")
    public ResponseEntity<Policeman> registerNewPoliceman(@RequestBody PolicemanPayload payload) {
        if (payload.getPassword() != null && payload.getEmail() != null && payload.getName() != null && payload.getPhoneNumber() != null && payload.getUsername() != null) {
            if (!payload.getPhoneNumber().isEmpty() || !payload.getName().isEmpty() || !payload.getEmail().isEmpty() || !payload.getPassword().isEmpty()) {
                if (!policemanService.isEmailUsed(payload.getEmail())) {
                    Policeman p = new Policeman();
                    p.setMunicipality(municipalityService.getMunicipalityByDistrictCode(payload.getDistrictCode()));
                    p.setName(payload.getName());
                    p.setSurname(payload.getSurname());
                    p.setEmail(payload.getEmail());
                    p.setUsername(payload.getUsername());
                    p.setPhoneNumber(payload.getPhoneNumber());
                    p.setRole(ApplicationUserRole.POLICEMAN);
                    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                    p.setPassword(passwordEncoder.encode(payload.getPassword()));

                    policemanService.addNewPoliceman(p);
                    return new ResponseEntity<>(p, HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
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

    @PostMapping("/assign")
    public Policeman assignPoliceman(@RequestBody AssignmentPayload payload) {

        Policeman p = policemanService.getOneByName(payload.getPolicemanName());
        System.out.println(payload);
        ParkingPlace pp = parkingPlaceService.getOneByAddress(payload.getParkingAddress());
        p.setAssignedParkingPlace(pp);
        return policemanService.update(p);
    }


    @PostMapping("/unassign")
    public Policeman unassignPoliceman(@RequestBody UnassignmentPayload payload) {
        Policeman p = policemanService.getOneByName(payload.getPolicemanName());
        p.setAssignedParkingPlace(null);
        return policemanService.update(p);
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public void deletePoliceman(@PathVariable Long id) {
        policemanService.One(id);
        //policemanService.deleteById(id);
    }
}
