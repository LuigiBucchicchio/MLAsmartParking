package com.spmproject.smartparking.vehicle;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spmproject.smartparking.ItemNotFoundException;
import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverRepository;
import com.spmproject.smartparking.reservation.Reservation;

@RestController
public class VehicleController {
	@Autowired
	private VehicleRepository vehicleRepository;
	private DriverRepository driverRepository;

	@GetMapping("/vehicle/all")
	List<Vehicle> all() {
		return (List<Vehicle>) vehicleRepository.findAll();
	}

	@PostMapping("/vehicle/add")
	Vehicle newVehicle(@RequestParam String vehiclePlate
			, @RequestParam String type, @RequestParam String brand , @RequestParam long driverID) {
		Vehicle v= new Vehicle();
		v.setVehiclePlate(vehiclePlate);
		v.setBrand(brand);

		VehicleType vehicleType=typeMap(type);
		v.setType(vehicleType);

		Driver d = driverRepository.findById(driverID).orElseThrow(() -> new ItemNotFoundException(driverID));
		Set<Driver> driverSet = new HashSet<Driver>();
		driverSet.add(d);
		v.setOwners(driverSet);
		v.setReservations(new HashSet<Reservation>());
		d.getVehicle_owned().add(v);
		return vehicleRepository.save(v);
	}

	@GetMapping("/vehicle/{vehiclePlate}")
	Vehicle one(@PathVariable String vehiclePlate) {
		return vehicleRepository.findById(vehiclePlate).orElseThrow(() -> new ItemNotFoundException(vehiclePlate));
	}

	@PutMapping("/vehicle/{vehiclePlate}")
	Vehicle replaceVehicle(@RequestParam String vehiclePlate
			, @RequestParam String type, @RequestParam String brand , @RequestParam long driverID){
		Vehicle v = vehicleRepository.findById(vehiclePlate).orElseThrow(() -> new ItemNotFoundException(vehiclePlate));

		if(!(v.getBrand().equals(brand)))
			v.setBrand(brand);

		Driver d = driverRepository.findById(driverID).orElseThrow(() -> new ItemNotFoundException(driverID));

		if(!v.getOwners().contains(d)) {
			v.getOwners().add(d);
			d.getVehicle_owned().add(v);
		}

		VehicleType vehicleType=typeMap(type);

		if(!v.getType().equals(vehicleType))
			v.setType(vehicleType);

		return v;
	}

	@DeleteMapping("/vehicle/{vehiclePlate}")
	void deleteVehicle(@PathVariable String vehiclePlate) {
		vehicleRepository.findById(vehiclePlate).orElseThrow(() -> new ItemNotFoundException(vehiclePlate));
		vehicleRepository.deleteById(vehiclePlate);
	}

	//map string type to the corresponding VehicleType enum
	private VehicleType typeMap (String type) {
		VehicleType vehicleType;
		if(type.equals("Motociclo"))
			vehicleType=VehicleType.MOTOCICLO;
		else if(type.equals("Autovettura"))
			vehicleType=VehicleType.AUTOVETTURA;
		else if(type.equals("Autobus"))
			vehicleType=VehicleType.AUTOBUS;
		else if(type.equals("Motocarro"))
			vehicleType=VehicleType.MOTOCARRO;
		else if(type.equals("Autocarro"))
			vehicleType=VehicleType.AUTOCARRO;
		else if(type.equals("Ciclomotore"))
			vehicleType=VehicleType.CICLOMOTORE;
		else if(type.equals("Macchina Operatrice"))
			vehicleType=VehicleType.MACC_OPERATRICE;
		else vehicleType=null;
		return vehicleType;
	}

}
