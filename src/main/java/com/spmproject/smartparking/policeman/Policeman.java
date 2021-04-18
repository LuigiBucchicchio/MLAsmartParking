package com.spmproject.smartparking.policeman;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.spmproject.smartparking.parkingPlace.ParkingPlace;

import lombok.Data;

@Entity
@Data
public class Policeman {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String name;

	private String surname;

	private String email;

	private String password;

	private String phoneNumber;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "assignedParkingPlaceID", referencedColumnName = "id")
	private ParkingPlace assignedParkingPlace;
	
}
