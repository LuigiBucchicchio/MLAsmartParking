package com.spmproject.smartparking.reservation;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReservationPayload {
	
	private Timestamp startingTime;	
	private Timestamp endingTime;
	private String vehiclePlate;
	
	public ReservationPayload(Timestamp startingTime, Timestamp endingTime, String vehiclePlate) {
		this.startingTime=startingTime;
		this.endingTime=endingTime;
		this.vehiclePlate=vehiclePlate;
	}
}
