package com.spmproject.smartparking.parkingPlace;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ModificationPayload {
	private long parkingPlaceID;
	private int spotsNumber;
	private String address;
	public ModificationPayload(long parkingPlaceID, int spotsNumber, String address) {
		this.parkingPlaceID=parkingPlaceID;
		this.spotsNumber=spotsNumber;
		this.address=address;
	}

}
