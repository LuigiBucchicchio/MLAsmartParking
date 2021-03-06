package com.spmproject.smartparking.reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public Reservation one(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getAllReservationsOfOneVehicle(String vehiclePlate) {
        return this.reservationRepository.findAllByVehicleVehiclePlate(vehiclePlate);
    }

    public Reservation addNewReservation(Reservation r) {
        return this.reservationRepository.save(r);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
