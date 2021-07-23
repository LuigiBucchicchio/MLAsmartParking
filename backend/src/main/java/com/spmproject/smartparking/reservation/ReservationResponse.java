package com.spmproject.smartparking.reservation;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReservationResponse {
    private String vehiclePlate;
    private Timestamp startingTime;
    private Timestamp endingTime;
    private String parkingPlaceName;
    private long parkingPlaceSpot;
}
