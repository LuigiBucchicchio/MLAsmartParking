package com.spmproject.smartparking.driver;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.spmproject.smartparking.vehicle.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "driver")
public class DriverController {

    @Autowired
    protected AuthenticationManager authenticationManager;

    private DriverService driverService;

    @Autowired
    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
    @PostMapping("/add")
    public ResponseEntity addNewDriver(@RequestBody DriverPayload payload) {

        if (!driverService.existingDriver(payload.getEmail())) {
            Driver n = new Driver();
            n.setName(payload.getName());
            n.setSurname(payload.getSurname());
            n.setEmail(payload.getEmail());
            n.setUsername(payload.getUsername());
            n.setPhoneNumber(payload.getPhoneNumber());
            n.setPassword(payload.getPassword());

            driverService.addNewDriver(n);
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public Driver getDriver(@PathVariable Long id) {
        return driverService.one(id);
    }

	@GetMapping("/")
	public Driver getProfile(Authentication authentication) {
		return driverService.one(authentication.getName());
	}

	@PutMapping("/")
    public Driver putProfile(Authentication authentication) {
        Driver d = driverService.one(authentication.getName());

        return driverService.update(d);
    }

	@GetMapping("vehicle/all")
	public Set<Vehicle> allDriverVehicle(Authentication authentication) {
		Driver d = driverService.one(authentication.getName());
		Set<Vehicle> allDriverVehicle = d.getVehicle_owned();
		return allDriverVehicle;
	}
}