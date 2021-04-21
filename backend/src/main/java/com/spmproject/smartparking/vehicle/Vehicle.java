package com.spmproject.smartparking.vehicle;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

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
	
	@ManyToMany(mappedBy = "vehicle_owned")
	private Set<Driver> owners;
	
	@OneToMany
	private Set<Reservation> reservations;
}
