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
    private String city;
    String address;
    double lat;
    double lng;

    public ParkingPlacePayload(int spotsNumber,String city, String address, double lat, double lng) {
        this.city = city;
        this.address = address;
        this.spotsNumber = spotsNumber;
        this.lat = lat;
        this.lng = lng;
    }
}
