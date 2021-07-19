package com.spmproject.smartparking.vehicle;

import java.util.Set;

import javax.persistence.*;

import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.reservation.Reservation;

import lombok.Data;

@Entity
@Data
public class Vehicle {

    @Id
    private String vehiclePlate;

    private Enum<VehicleType> type;

    private String brand;

    @OneToMany
    private Set<Reservation> reservations;
}
