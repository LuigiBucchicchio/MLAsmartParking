package com.spmproject.smartparking.policeman;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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

	@NotNull
    @NotEmpty(message = "*Please provide an Email")
	@Email(regexp = ".+@.+\\..+", message = "*Please provide a valid Email")
	private String email;
 
    @NotNull
    @NotEmpty(message = "*Please provide a Password")
	private String password;

	private String phoneNumber;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "assignedParkingPlaceID", referencedColumnName = "id")
	private ParkingPlace assignedParkingPlace;
	
}
