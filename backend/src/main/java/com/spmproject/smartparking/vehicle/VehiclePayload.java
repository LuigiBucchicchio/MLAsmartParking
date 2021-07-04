package com.spmproject.smartparking.vehicle;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class VehiclePayload {

    private String vehiclePlate;
    private String type;
    private String brand;

    public VehiclePayload(String vehiclePlate, String type, String brand) {
        this.vehiclePlate = vehiclePlate;
        this.type = type;
        this.brand = brand;
    }

}