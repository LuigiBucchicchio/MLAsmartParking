package com.spmproject.smartparking.reservation;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.vehicle.Vehicle;

import lombok.Data;

@Entity
@Data
public class Reservation {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private Timestamp startingTime;
	
	private Timestamp endingTime;

	@ManyToOne
	private ParkingSpot parkingSpot;
	
	@ManyToOne
	private Vehicle vehicle;
}
