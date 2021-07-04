package com.spmproject.smartparking.driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {
    private final DriverRepository driverRepository;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    // search for a driver by email
    public Boolean existingDriver(String email) {
        return driverRepository.existsByEmail(email);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Driver addNewDriver(Driver d) {
        Driver driver = new Driver(
                d.getName(),
                d.getSurname(),
                d.getEmail(),
                d.getUsername(),
                passwordEncoder.encode(d.getPassword()),
                d.getPhoneNumber()
        );

        return this.driverRepository.save(driver);
    }

    public Driver one(long driverID) {
        return driverRepository.findById(driverID).orElseThrow(() -> new ItemNotFoundException(driverID));
    }

	public Driver one(String username) {
		return driverRepository.findByUsername(username).orElseThrow(() -> new ItemNotFoundException(username));
	}
	public void remove(Long id) {
		driverRepository.deleteById(id);
	}
        return driverRepository.save(d);
    public Driver update(Driver d) {
    }
}
