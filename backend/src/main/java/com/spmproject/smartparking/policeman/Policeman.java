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

import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;

import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Policeman extends User {

	private String surname;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "assignedParkingPlaceID", referencedColumnName = "id")
	private ParkingPlace assignedParkingPlace;



	Policeman(String name, String surname, String email, String username, String password, String phoneNumber) {
		super(name, email, username, password, phoneNumber, ApplicationUserRole.POLICEMAN);
		this.surname = surname;
	}

}
