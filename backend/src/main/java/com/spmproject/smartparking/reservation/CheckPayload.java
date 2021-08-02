package com.spmproject.smartparking.reservation;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CheckPayload {

	private String address;
	private String plate;
	
	public CheckPayload(String address, String plate) {
		this.address=address;
		this.plate=plate;
	}
}
