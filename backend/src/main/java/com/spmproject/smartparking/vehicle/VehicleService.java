package com.spmproject.smartparking.vehicle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle addNewVehicle(Vehicle v) {
        return this.vehicleRepository.save(v);
    }

    public Vehicle one(String vehiclePlate) {
        return vehicleRepository.findById(vehiclePlate).orElseThrow(() -> new ItemNotFoundException(vehiclePlate));
    }

    public void deleteById(String vehiclePlate) {
        vehicleRepository.deleteById(vehiclePlate);
    }

    public Vehicle update(Vehicle v) {
        return vehicleRepository.save(v);
    }
}