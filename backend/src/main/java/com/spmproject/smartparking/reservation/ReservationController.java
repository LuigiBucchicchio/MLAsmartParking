package com.spmproject.smartparking.reservation;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.ItemNotFoundException;
import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotRepository;
import com.spmproject.smartparking.vehicle.Vehicle;
import com.spmproject.smartparking.vehicle.VehicleRepository;

@RestController
public class ReservationController {

	@Autowired
	private ReservationRepository reservationRepository;
	private VehicleRepository vehicleRepository;
	private ParkingSpotRepository parkingSpotRepository;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/reservation/all")
	public List<Reservation> all() {
		return (List<Reservation>) reservationRepository.findAll();
	}

	@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_POLICEMAN')")
	@PostMapping("/reservation/add")
	public Reservation newReservation(@RequestParam Timestamp endingTime, @RequestParam long parkingSpotID
			, @RequestParam String vehiclePlate) {
		Vehicle vehicleReserved = vehicleRepository.findById(vehiclePlate).orElseThrow(()-> new ItemNotFoundException(vehiclePlate));
		ParkingSpot spotReserved = parkingSpotRepository.findById(parkingSpotID).orElseThrow(()-> new ItemNotFoundException(parkingSpotID));
		Reservation reservation= new Reservation();
		Date now= new Date();
		Timestamp timestamp = new Timestamp(now.getTime());
		reservation.setStartingTime(timestamp);
		reservation.setEndingTime(endingTime);
		reservation.setVehicle(vehicleReserved);
		reservation.setParkingSpot(spotReserved);
		return reservationRepository.save(reservation);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/reservation/{id}")
	public Reservation one(@PathVariable Long id) {
		return reservationRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/reservation/{id}")
	public Reservation replaceReservation(@RequestParam Timestamp startingTime, @RequestParam Timestamp endingTime
			, @RequestParam long parkingSpotID, @RequestParam String vehiclePlate, @PathVariable Long id){
		Reservation reservation= reservationRepository.findById(id).orElseThrow(()-> new ItemNotFoundException(id));
		Vehicle vehicleReserved = vehicleRepository.findById(vehiclePlate).orElseThrow(()-> new ItemNotFoundException(vehiclePlate));
		ParkingSpot spotReserved = parkingSpotRepository.findById(parkingSpotID).orElseThrow(()-> new ItemNotFoundException(parkingSpotID));

		if(!(reservation.getStartingTime().equals(startingTime)))
			reservation.setStartingTime(startingTime);
		if(!(reservation.getEndingTime().equals(endingTime)))
			reservation.setEndingTime(endingTime);
		if(!(reservation.getVehicle().equals(vehicleReserved)))
			reservation.setVehicle(vehicleReserved);
		if(!(reservation.getParkingSpot().equals(spotReserved)))
			reservation.setParkingSpot(spotReserved);

		return reservation;
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/reservation/{id}")
	public void deleteReservation(@PathVariable Long id) {
		reservationRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
		reservationRepository.deleteById(id);
	}

}
