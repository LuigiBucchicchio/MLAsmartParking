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
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private DriverService driverService;

    @Autowired
    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
    @PostMapping("/add")
    public ResponseEntity<Driver> addNewDriver(@RequestBody DriverPayload payload) {
        if (payload.getPassword() != null && payload.getEmail() != null && payload.getSurname() != null && payload.getName() != null && payload.getPhoneNumber() != null) {
            if (!payload.getPhoneNumber().isEmpty() || !payload.getSurname().isEmpty() || !payload.getName().isEmpty() || !payload.getEmail().isEmpty() || !payload.getPassword().isEmpty()) {
                if (!driverService.existingDriver(payload.getEmail())) {
                    Driver n = new Driver();
                    n.setName(payload.getName());
                    n.setSurname(payload.getSurname());
                    n.setEmail(payload.getEmail());
                    n.setUsername(payload.getUsername());
                    n.setPhoneNumber(payload.getPhoneNumber());
                    n.setPassword(payload.getPassword());

                    driverService.addNewDriver(n);
                    return new ResponseEntity<>(n, HttpStatus.OK);
                }
                else {
                    System.out.println("QUii");
                    return new ResponseEntity(HttpStatus.CONFLICT);
                }
                }
            }
        return new ResponseEntity(HttpStatus.CONFLICT);
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
    public ResponseEntity<Driver> getProfile(Authentication authentication) {
        if (authentication != null) {
            Driver d = driverService.one(authentication.getName());
            if (!d.getName().isEmpty()) {
                return new ResponseEntity<>(d, HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.CONFLICT);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity<Driver> putProfile(@RequestBody DriverPayload payload, Authentication authentication) {
        if (authentication != null) {
            Driver driver = driverService.one(authentication.getName());
            if (!driver.getName().isEmpty()) {
                driver.setUsername(driver.getUsername());
                driver.setEmail(payload.getEmail());
                driver.setName(payload.getName());
                driver.setSurname(payload.getSurname());
                driver.setPhoneNumber(payload.getPhoneNumber());

                // check if password was changed
                if (driver.getPassword() != payload.getPassword()) {
                    driver.setPassword(passwordEncoder.encode(payload.getPassword()));
                } else {
                    driver.setPassword(driver.getPassword());
                }
                System.out.println(driver);
                return new ResponseEntity<>(driverService.update(driver), HttpStatus.OK);
            }

        }
        return new ResponseEntity(HttpStatus.CONFLICT);
    }

    @GetMapping("vehicle/all")
    public Set<Vehicle> allDriverVehicle(Authentication authentication) {
        Driver d = driverService.one(authentication.getName());
        Set<Vehicle> allDriverVehicle = d.getVehicle_owned();
        return allDriverVehicle;
    }
}