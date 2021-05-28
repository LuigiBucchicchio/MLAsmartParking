package com.spmproject.smartparking.municipality;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MunicipalityPayload {
	private String name;
	private String username;
	private String email;
	private String phoneNumber;
	private String password;

	public MunicipalityPayload(String name, String username, String email, String password, String phoneNumber ) {
		this.name=name;
		this.username=username;
		this.email=email;
		this.phoneNumber=phoneNumber;
		this.password=password;
	}
}
