package com.spmproject.smartparking.parkingPlace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "parking-place")
public class ParkingPlaceController {

    private final ParkingPlaceService parkingPlaceService;

    @Autowired
    public ParkingPlaceController(ParkingPlaceService parkingPlaceService) {
        this.parkingPlaceService = parkingPlaceService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    List<ParkingPlace> getAllParkingPlaces() {
        return parkingPlaceService.getAllParkingPlaces();
    }

}
