package com.spmproject.smartparking.reservation;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;
import com.spmproject.smartparking.vehicle.Vehicle;
import com.spmproject.smartparking.vehicle.VehicleService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "reservetion")
public class ReservationController {

	private ReservationService reservationService;
	private VehicleService vehicleService;
	private ParkingSpotService parkingSpotService;

	@Autowired
	public ReservationController(ReservationService reservationService, VehicleService vehicleService,
			ParkingSpotService parkingSpotService) {
		this.reservationService=reservationService;
		this.parkingSpotService=parkingSpotService;
		this.vehicleService=vehicleService;
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/all")
	public List<Reservation> all() {
		return reservationService.getAllReservations();
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_POLICEMAN')")
	@PostMapping("/{parkingPlaceID}/add")
	public Reservation newReservation(@RequestBody ReservationPayload payload, @PathVariable Long parkingPlaceID) {
		System.out.println("New Reservation ");
		
	    List<ParkingSpot> listaMistica = parkingSpotService.getFreeParkingSpotFromPlace(true,parkingPlaceID);
	    Collections.shuffle(listaMistica);
	    ParkingSpot spottino = listaMistica.get(0);
		System.out.println("Prima dell'errore ");
		Vehicle vehicleReserved = vehicleService.one(payload.getVehiclePlate());
		System.out.println("Dopo dell'errore ");
		System.out.println(vehicleReserved);
		Reservation reservation= new Reservation();
		
		reservation.setStartingTime(payload.getStartingTime());
		reservation.setEndingTime(payload.getEndingTime());
		reservation.setVehicle(vehicleReserved);
		reservation.setParkingSpot(spottino);
		spottino.setFree(false);
		parkingSpotService.addNewParkingSpot(spottino);
		return reservationService.addNewReservation(reservation);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/{id}")
	public Reservation one(@PathVariable Long id) {
		return reservationService.one(id);
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/{id}")
	public Reservation replaceReservation(@RequestBody ReservationPayload payload ,@PathVariable Long id){

		Reservation reservation= reservationService.one(id);
		Vehicle vehicleReserved = vehicleService.one(payload.getVehiclePlate());

		if(!(reservation.getStartingTime().equals(payload.getStartingTime())))
			reservation.setStartingTime(payload.getStartingTime());
		if(!(reservation.getEndingTime().equals(payload.getEndingTime())))
			reservation.setEndingTime(payload.getEndingTime());
		if(!(reservation.getVehicle().equals(vehicleReserved)))
			reservation.setVehicle(vehicleReserved);

		return reservation;
	}

	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
	public void deleteReservation(@PathVariable Long id) {
		reservationService.one(id);
		reservationService.deleteReservation(id);
	}

}
