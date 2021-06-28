package com.spmproject.smartparking.parkingPlace;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ParkingPlacePayload {
    int spotsNumber;
    String address;

    public ParkingPlacePayload(int spotsNumber, String address) {
        this.address = address;
        this.spotsNumber = spotsNumber;
    }
}
