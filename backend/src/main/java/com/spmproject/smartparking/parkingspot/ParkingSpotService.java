package com.spmproject.smartparking.parkingspot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

@Service
public class ParkingSpotService {

	private final ParkingSpotRepository parkingSpotRepository;

	@Autowired
	public ParkingSpotService(ParkingSpotRepository parkingSpotRepository) {
		this.parkingSpotRepository=parkingSpotRepository;
	}

	public List<ParkingSpot> getAllParkingSpots() {
		return parkingSpotRepository.findAll();
	}

	public ParkingSpot addNewParkingSpot(ParkingSpot ps) {
		return this.parkingSpotRepository.save(ps);
	}

	public ParkingSpot one(long parkingSpotID) {
		return parkingSpotRepository.findById(parkingSpotID).orElseThrow(()-> new ItemNotFoundException(parkingSpotID));
	}

}
