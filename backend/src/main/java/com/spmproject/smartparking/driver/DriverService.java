package com.spmproject.smartparking.driver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.spmproject.smartparking.ItemNotFoundException;

import java.util.List;

@Service
public class DriverService {
	private final DriverRepository driverRepository;

	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	public DriverService(DriverRepository driverRepository) {
		this.driverRepository = driverRepository;
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

	public Driver update(Driver d) {
		return driverRepository.save(d);
	}
}
