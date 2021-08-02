package com.spmproject.smartparking.parkingPlace;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ParkingPlaceResponse {
    private long id;
    private String city;
    private String address;
    private int freeParkingSpots;
    private double lat;
    private double lng;
}
