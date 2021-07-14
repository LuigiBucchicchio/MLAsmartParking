package com.spmproject.smartparking.vehicle;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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

    //@PreAuthorize("hasRole('ROLE_ADMIN','ROLE_DRIVER')")
    @PostMapping("/add")
    public String newVehicle(@RequestBody VehiclePayload payload, Authentication authentication) {
        Driver d = driverService.one(authentication.getName());

        if (d.getName() != "") {
            Vehicle v= new Vehicle();

            v.setVehiclePlate(payload.getVehiclePlate());
            v.setBrand(payload.getBrand());

            VehicleType vehicleType=typeMap(payload.getType());
            v.setType(vehicleType);

            vehicleService.addNewVehicle(v);

            Set<Driver> driverSet = new HashSet<Driver>();
            driverSet.add(d);

            v.setOwners(driverSet);

            System.out.println("Vehicle " + v);
            v.setReservations(new HashSet<Reservation>());
            d.getVehicle_owned().add(v);
            driverService.update(d);
            return "Success";
        }
        return "no driver";
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{vehiclePlate}")
    public Vehicle one(@PathVariable String vehiclePlate) {
        return vehicleService.one(vehiclePlate);
    }

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

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{vehiclePlate}")
    public void deleteVehicle(@PathVariable String vehiclePlate) {
        vehicleService.one(vehiclePlate);
        vehicleService.deleteById(vehiclePlate);
    }

    //map string type to the corresponding VehicleType enum
    private VehicleType typeMap(String type) {
        VehicleType vehicleType;
        if (type.equals("Motociclo"))
            vehicleType = VehicleType.MOTOCICLO;
        else if (type.equals("Autovettura"))
            vehicleType = VehicleType.AUTOVETTURA;
        else if (type.equals("Autobus"))
            vehicleType = VehicleType.AUTOBUS;
        else if (type.equals("Motocarro"))
            vehicleType = VehicleType.MOTOCARRO;
        else if (type.equals("Autocarro"))
            vehicleType = VehicleType.AUTOCARRO;
        else if (type.equals("Ciclomotore"))
            vehicleType = VehicleType.CICLOMOTORE;
        else if (type.equals("Macchina Operatrice"))
            vehicleType = VehicleType.MACC_OPERATRICE;
        else vehicleType = null;
        return vehicleType;
    }

}
