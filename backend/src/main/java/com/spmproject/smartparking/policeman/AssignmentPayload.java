package com.spmproject.smartparking.policeman;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AssignmentPayload {
	
	private String policemanName;
	private String parkingAddress;
	
	public AssignmentPayload(String policemanName, String parkingAddress) {
		this.parkingAddress=parkingAddress;
		this.policemanName=policemanName;
	}

}
