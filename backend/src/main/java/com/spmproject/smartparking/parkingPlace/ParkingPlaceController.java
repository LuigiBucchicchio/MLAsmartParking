package com.spmproject.smartparking.parkingPlace;

import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityService;
import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;
import com.spmproject.smartparking.reservation.Reservation;

import javax.swing.text.html.Option;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "parking-place")
public class ParkingPlaceController {

    private final ParkingPlaceService parkingPlaceService;
    private final MunicipalityService municipalityService;
    private final ParkingSpotService parkingSpotService;
    @Autowired
    UserRepository userRepository;

    @Autowired
    public ParkingPlaceController(ParkingPlaceService parkingPlaceService, MunicipalityService municipalityService
            , ParkingSpotService parkingSpotService) {
        this.parkingPlaceService = parkingPlaceService;
        this.municipalityService = municipalityService;
        this.parkingSpotService = parkingSpotService;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    @ResponseBody
    public List<ParkingPlace> getAllParkingPlaces() {
        return parkingPlaceService.getAllParkingPlaces();
    }

    //@PreAuthorize("hasAuthority('parkingPlace:write')")
    @PostMapping("/add")
    public ParkingPlace newParkingPlace(@RequestBody ParkingPlacePayload payload) {

        int spotsNumber = payload.getSpotsNumber();
        String address = payload.getAddress();
        ParkingPlace p = new ParkingPlace();
		
		/*
		 String username="";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
		  username = ((UserDetails)principal).getUsername();
		} else {
		  username = principal.toString();
		}
		Municipality m= municipalityService.getMunicipality(username);
		*/

        String currentUserName = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            currentUserName = authentication.getName();
        }

        Municipality m = municipalityService.getMunicipality(currentUserName);

        p.setAddress(address);
        p.setSpotsNumber(spotsNumber);
        p.setMunicipality(m);
        ParkingPlace saved = parkingPlaceService.addNewParkingPlace(p);
        for (int i = 0; i < spotsNumber; i++) {
            ParkingSpot s = new ParkingSpot();
            s.setLevel(0);
            s.setParkingPlaceID(p.getParkingPlaceID());
            s.setProgressiveNumber(i + 1);
            s.setReservations(new HashSet<Reservation>());
            parkingSpotService.addNewParkingSpot(s);
        }
        return saved;
    }

    @GetMapping("/")
    public List<ParkingPlace> getAllMunicipalityParkingPlaces(Authentication authentication) {
        Municipality m = municipalityService.getMunicipality(authentication.getName());
        return parkingPlaceService.getParkingPlacesOfAMunicipality(m.getId());
    }

    @PostMapping("/modify")
    public ParkingPlace parkingPlaceModification(@RequestBody ModificationPayload payload) {
        String currentUserName = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            currentUserName = authentication.getName();
        }
        Municipality m = municipalityService.getMunicipality(currentUserName);
        List<ParkingPlace> parkingList = parkingPlaceService.getParkingPlacesOfAMunicipality(m.getId());
        ParkingPlace pp = parkingPlaceService.one(payload.getParkingPlaceID());

        if (parkingList.contains(pp)) {
            int before = pp.getSpotsNumber();
            int after = payload.getSpotsNumber();
            int diff = Math.abs(before - after);
            List<ParkingSpot> spotList = parkingSpotService.getParkingSpotsFromPlace(pp.getParkingPlaceID());

            if (before > after) {
                for (int i = 0; i < diff; i++) {
                    ParkingSpot spot = spotList.get(spotList.size() - 1);
                    spotList.remove(spotList.size() - 1);
                    parkingSpotService.deleteParkingSpot(spot.getId());

                    pp.setSpotsNumber(payload.getSpotsNumber());
                }
            } else if (after > before) {
                int lastProg = spotList.get(spotList.size() - 1).getProgressiveNumber();
                for (int i = 0; i < diff; i++) {
                    ParkingSpot s = new ParkingSpot();
                    s.setLevel(0);
                    s.setParkingPlaceID(pp.getParkingPlaceID());
                    s.setProgressiveNumber(i + 1 + lastProg);
                    s.setReservations(new HashSet<Reservation>());
                    parkingSpotService.addNewParkingSpot(s);

                    pp.setSpotsNumber(payload.getSpotsNumber());
                }
            } else {
                //nothing changed
            }
            pp.setAddress(payload.getAddress());
        } else {
            //not contains
        }

        return parkingPlaceService.addNewParkingPlace(pp);
    }


}
