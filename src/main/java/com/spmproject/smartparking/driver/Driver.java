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

@Entity
@Data
public class Driver {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;

	private String name;

	private String surname;

	private String phoneNumber;

	private String password;

	@ManyToMany
	@JoinTable(
			name = "vehicle_owned",
			joinColumns = @JoinColumn(name = "id"), 
			inverseJoinColumns = @JoinColumn(name = "vehiclePlate")
			)
	Set<Vehicle> vehicle_owned;

	private String email;

}