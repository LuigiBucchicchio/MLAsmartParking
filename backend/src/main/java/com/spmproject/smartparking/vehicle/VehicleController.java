package com.spmproject.smartparking.vehicle;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverService;
import com.spmproject.smartparking.reservation.Reservation;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "vehicle")
public class VehicleController {

    private VehicleService vehicleService;
    private DriverService driverService;

    @Autowired
    public VehicleController(VehicleService vehicleService, DriverService driverService) {
        this.driverService = driverService;
        this.vehicleService = vehicleService;
    }


    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<Vehicle> all() {
        return vehicleService.getAllVehicles();
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/driver/all")
    public Set<Vehicle> allOneDriver() {

        String currentUserName = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            currentUserName = authentication.getName();
        }

        Driver d = driverService.one(currentUserName);
        Set<Vehicle> allDriverVehicle = d.getVehicle_owned();

        return allDriverVehicle;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
    @PostMapping("/add")
    public ResponseEntity newVehicle(@RequestBody VehiclePayload payload, Authentication authentication) {
        Driver d = driverService.one(authentication.getName());
        if (d.getName() != "") {
            Vehicle v = new Vehicle();

            v.setVehiclePlate(payload.getVehiclePlate());
            v.setBrand(payload.getBrand());

            VehicleType vehicleType = typeMap(payload.getType());
            v.setType(vehicleType);

            vehicleService.addNewVehicle(v);

            v.setReservations(new HashSet<Reservation>());
            d.getVehicle_owned().add(v);
            driverService.update(d);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.CONFLICT);
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{vehiclePlate}")
    public Vehicle one(@PathVariable String vehiclePlate) {
        return vehicleService.one(vehiclePlate);
    }

    /*
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{vehiclePlate}")
    public Vehicle replaceVehicle(@RequestBody VehiclePayload payload, @PathVariable String vehiclePlate) {
        Vehicle v = vehicleService.one(vehiclePlate);

        if (!(v.getBrand().equals(payload.getBrand())))
            v.setBrand(payload.getBrand());

        // Must get DriverID from the context
        // here only the Default one
        Driver d = driverService.one((long) 1);

        if (!v.getOwners().contains(d)) {
            v.getOwners().add(d);
            d.getVehicle_owned().add(v);
            driverService.update(d);
        }

        VehicleType vehicleType = typeMap(payload.getType());

        if (!v.getType().equals(vehicleType))
            v.setType(vehicleType);

        return vehicleService.update(v);
    }
    */

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{vehiclePlate}")
    public void deleteVehicle(@PathVariable String vehiclePlate, Authentication auth) {
        System.out.println("Ciaoo");
        System.out.println();
        // find driver

        Driver d = driverService.one(auth.getName());

        Vehicle v = vehicleService.one(vehiclePlate);
        d.getVehicle_owned().remove(v);

        driverService.update(d);

        vehicleService.deleteById(vehiclePlate);


    }

    //map string type to the corresponding VehicleType enum
    private VehicleType typeMap(String type) {
        VehicleType vehicleType;
        if (type.equals("MOTORCYCLE"))
            vehicleType = VehicleType.MOTORCYCLE;
        else if (type.equals("CAR"))
            vehicleType = VehicleType.CAR;
        else if (type.equals("AUTOBUS"))
            vehicleType = VehicleType.AUTOBUS;
        else if (type.equals("MOTORCARRIAGE"))
            vehicleType = VehicleType.MOTORCARRIAGE;
        else if (type.equals("CARTRIDGE"))
            vehicleType = VehicleType.CARTRIDGE;
        else if (type.equals("CYCLOMOTOR"))
            vehicleType = VehicleType.CYCLOMOTOR;
        else if (type.equals("MACHINE OPERATOR"))
            vehicleType = VehicleType.MACHINE_OPERATOR;
        else vehicleType = null;
        return vehicleType;
    }

}
