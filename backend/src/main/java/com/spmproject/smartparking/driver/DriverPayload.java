package com.spmproject.smartparking.driver;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class DriverPayload {
	private String name;
	private String surname;
	private String username;
	private String email;
	private String phoneNumber;
	private String password;
public DriverPayload(String name, String surname, String username, String email, String password, String phoneNumber) {
	this.name=name;
	this.surname=surname;
	this.username=username;
	this.email=email;
	this.phoneNumber=phoneNumber;
	this.password=password;
}
}


