package com.spmproject.smartparking.driver;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.security.ApplicationUserRole;
import com.spmproject.smartparking.vehicle.Vehicle;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
public class Driver extends User {

	private String surname;

	@ManyToMany
	@JoinTable(
			name = "vehicle_owned",
			joinColumns = @JoinColumn(name = "id"), 
			inverseJoinColumns = @JoinColumn(name = "vehiclePlate")
			)
	private Set<Vehicle> vehicle_owned;

	public Driver(String name, String surname, String email, String username, String password, String phoneNumber) {
		super(name, email, username, password, phoneNumber, ApplicationUserRole.DRIVER);
		this.surname = surname;
	}

}