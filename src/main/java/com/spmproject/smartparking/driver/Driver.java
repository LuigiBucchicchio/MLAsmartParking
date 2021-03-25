package com.spmproject.smartparking.driver;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.spmproject.smartparking.vehicle.Vehicle;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Driver {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	private String name;

	private String surname;

	private String email;

	private String password;

	private String phoneNumber;

	@ManyToMany
	@JoinTable(
			name = "vehicle_owned",
			joinColumns = @JoinColumn(name = "id"), 
			inverseJoinColumns = @JoinColumn(name = "vehiclePlate")
			)
	private Set<Vehicle> vehicle_owned;

	public Driver(String name, String surname, String email, String password, String phoneNumber) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
	}
}