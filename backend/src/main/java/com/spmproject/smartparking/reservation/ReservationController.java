package com.spmproject.smartparking.reservation;

import java.util.*;
import java.util.stream.Stream;

import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverService;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceService;
import com.spmproject.smartparking.vehicle.VehiclePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;
import com.spmproject.smartparking.vehicle.Vehicle;
import com.spmproject.smartparking.vehicle.VehicleService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "reservation")
public class ReservationController {

    private ReservationService reservationService;
    private VehicleService vehicleService;
    private ParkingSpotService parkingSpotService;
    private ParkingPlaceService parkingPlaceService;
    private DriverService driverService;

    @Autowired
    public ReservationController(ReservationService reservationService, VehicleService vehicleService,
                                 ParkingSpotService parkingSpotService, DriverService driverService, ParkingPlaceService parkingPlaceService) {
        this.reservationService = reservationService;
        this.parkingSpotService = parkingSpotService;
        this.vehicleService = vehicleService;
        this.driverService = driverService;
        this.parkingPlaceService = parkingPlaceService;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<Reservation> all() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/driver/all")
    public Set<ReservationResponse> allDriverReservation(Authentication authentication) {
        Driver d = driverService.one(authentication.getName());
        Set<Reservation> reservations = new HashSet<>();
        ReservationResponse reservationResponse = new ReservationResponse();
        Set<ReservationResponse> reservationResponseSet = new HashSet<>();

        System.out.println("reservation all");
        // check driver
        if (d != null) {
            // set of all the vehicles of the auth driver
            Set<Vehicle> vehicles = d.getVehicle_owned();

            Stream<Vehicle> vehicleStream = vehicles.stream();

            vehicleStream.forEach((v) -> {
                reservations.addAll(reservationService.getAllReservationsOfOneVehicle(v.getVehiclePlate()));
            });

            // element where to store the response to send to the driver
            Iterator<Reservation> it = reservations.iterator();
            int count = 0;

            while (it.hasNext()) {
                Reservation r = it.next();

                // search for the parking place related to parking spot reservation
                ParkingPlace parkingPlace = parkingPlaceService.one(r.getParkingSpot().getParkingPlaceID());

                reservationResponse = new ReservationResponse();

                reservationResponse.setVehiclePlate(r.getVehicle().getVehiclePlate());
                reservationResponse.setParkingPlaceAddress(parkingPlace.getAddress());
                reservationResponse.setParkingPlaceSpot(r.getParkingSpot().getId());
                reservationResponse.setStartingTime(r.getStartingTime());
                reservationResponse.setEndingTime(r.getEndingTime());

                //boolean result = reservationResponseArray.
                //reservationResponseArray[count] = reservationResponse;
                reservationResponseSet.add(reservationResponse);

                count++;

            }
        }
        return reservationResponseSet;
    }

    @PostMapping("/{parkingPlaceID}/add")
    public Reservation newReservation(@RequestBody ReservationPayload payload, @PathVariable Long parkingPlaceID) {
        List<ParkingSpot> listaMistica = parkingSpotService.getFreeParkingSpotFromPlace(true, parkingPlaceID);
        Collections.shuffle(listaMistica);
        ParkingSpot spottino = listaMistica.get(0);

        Vehicle vehicleReserved = vehicleService.one(payload.getVehiclePlate());

        Reservation reservation = new Reservation();
        reservation.setStartingTime(payload.getStartingTime());
        reservation.setEndingTime(payload.getEndingTime());
        reservation.setVehicle(vehicleReserved);
        reservation.setParkingSpot(spottino);
        spottino.setFree(false);

        System.out.println(reservation);
        System.out.println(spottino);
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
    public Reservation replaceReservation(@RequestBody ReservationPayload payload, @PathVariable Long id) {

        Reservation reservation = reservationService.one(id);
        Vehicle vehicleReserved = vehicleService.one(payload.getVehiclePlate());

        if (!(reservation.getStartingTime().equals(payload.getStartingTime())))
            reservation.setStartingTime(payload.getStartingTime());
        if (!(reservation.getEndingTime().equals(payload.getEndingTime())))
            reservation.setEndingTime(payload.getEndingTime());
        if (!(reservation.getVehicle().equals(vehicleReserved)))
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
