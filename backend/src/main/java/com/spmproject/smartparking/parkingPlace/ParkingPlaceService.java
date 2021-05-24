package com.spmproject.smartparking.parkingPlace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;
import com.spmproject.smartparking.municipality.MunicipalityRepository;

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

	public ParkingPlace addNewParkingPlace(ParkingPlace p) {
		return this.parkingPlaceRepository.save(p);
	}
}
