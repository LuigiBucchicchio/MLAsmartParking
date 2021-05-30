package com.spmproject.smartparking.parkingspot;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.spmproject.smartparking.reservation.Reservation;

import lombok.Data;

@Entity
@Data
public class ParkingSpot {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	private long parkingPlaceID;

	private int progressiveNumber;

	private int level;
	
	private boolean isFree;

	@OneToMany
	private Set<Reservation> reservations;
}