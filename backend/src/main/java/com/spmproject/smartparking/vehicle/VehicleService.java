package com.spmproject.smartparking.vehicle;

import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;
import java.util.Set;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        List<Vehicle> lista = vehicleRepository.findAll();
        return lista;
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