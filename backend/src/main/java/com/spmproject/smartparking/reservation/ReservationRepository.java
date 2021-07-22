package com.spmproject.smartparking.reservation;

import com.spmproject.smartparking.parkingspot.ParkingSpot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    List<Reservation> findAllByVehicleVehiclePlate(String vehiclePlate);
}
