package com.spmproject.smartparking.parkingPlace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

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

    public List<ParkingPlace> getParkingPlacesOfAMunicipality(long id) {
        return parkingPlaceRepository.findByMunicipalityId(id);
    }

    public ParkingPlace addNewParkingPlace(ParkingPlace p) {
        return this.parkingPlaceRepository.save(p);
    }

    public ParkingPlace removeParkingPlace(Long id) {
        ParkingPlace found = this.parkingPlaceRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
        this.parkingPlaceRepository.delete(found);
        return found;
    }

    public ParkingPlace one(Long id) {
        ParkingPlace found = null;
        found = this.parkingPlaceRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
        return found;
    }

    public ParkingPlace getOneByAddress(String address) {
        return this.parkingPlaceRepository.findByAddress(address);
    }
}
