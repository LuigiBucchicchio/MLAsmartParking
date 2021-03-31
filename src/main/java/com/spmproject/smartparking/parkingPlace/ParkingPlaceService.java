package com.spmproject.smartparking.parkingPlace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingPlaceService {
    private final ParkingPlaceRepository parkingPlaceRepository;

    @Autowired
    public ParkingPlaceService(ParkingPlaceRepository parkingPlaceRepository) {
        this.parkingPlaceRepository = parkingPlaceRepository;
    }

    public List<ParkingPlace> getAllParkingPlaces() {
        return parkingPlaceRepository.findAll();
    }
}
