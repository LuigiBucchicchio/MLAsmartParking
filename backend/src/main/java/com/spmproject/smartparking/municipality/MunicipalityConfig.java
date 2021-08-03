package com.spmproject.smartparking.municipality;

import com.spmproject.smartparking.ItemNotFoundException;
import com.spmproject.smartparking.auth.UserRepository;
import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverRepository;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceRepository;
import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotRepository;
import com.spmproject.smartparking.policeman.Policeman;
import com.spmproject.smartparking.policeman.PolicemanRepository;
import com.spmproject.smartparking.reservation.Reservation;
import com.spmproject.smartparking.reservation.ReservationRepository;
import com.spmproject.smartparking.security.ApplicationUserRole;
import com.spmproject.smartparking.vehicle.Vehicle;
import com.spmproject.smartparking.vehicle.VehicleRepository;
import com.spmproject.smartparking.vehicle.VehicleService;
import com.spmproject.smartparking.vehicle.VehicleType;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class MunicipalityConfig {

    @Bean
    CommandLineRunner commandLineRunner(MunicipalityRepository municipalityRepository, DriverRepository driverRepository,
                                        UserRepository userRepository, ParkingPlaceRepository parkingPlaceRepository, PolicemanRepository policemanRepository,
                                        ParkingSpotRepository parkingSpotRepository, VehicleRepository vehicleRepository,
                                        ReservationRepository reservationRepository) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        return args -> {

            if (municipalityRepository.count() == ((long) 0)) {

                Municipality grottammare =
                        new Municipality(
                                "Comune Grottammare",
                                "grottammare@citta.it",
                                "PaeseAlto",
                                passwordEncoder.encode("pass"),
                                "33224455667"
                        );
                Municipality termoli =
                        new Municipality(
                                "Comune Termoli",
                                "termoli@citta.it",
                                "susharo",
                                passwordEncoder.encode("pass"),
                                "334455667"
                        );
                municipalityRepository.saveAll(List.of(grottammare, termoli));

            }

            if (driverRepository.count() == ((long) 0)) {
                Driver valerio = new Driver(
                        "Valerio",
                        "Lundini",
                        "valerio.lundini@gmail.com",
                        "noMaFalloUnUtente",
                        passwordEncoder.encode("eraMeglioIlLibro"),
                        "332244566"
                );
                Driver michela = new Driver(
                        "Michela",
                        "Giraud",
                        "michela.giraud@gmail.com",
                        "ilMignottonePazzo",
                        passwordEncoder.encode("ilSalottoConMichela"),
                        "334455667"
                );
                Driver edipo = new Driver(
                        "Edipo",
                        "Re",
                        "festaDellaMammaTuttiGiorni",
                        "edipo.re@libero.it",
                        "ahEraMamma",
                        "iNumeriArabiNonLiUso"
                );
                driverRepository.saveAll(List.of(valerio, michela, edipo));

            }
            if (parkingPlaceRepository.count() == ((long) 0)) {
                ParkingPlace parcheggioTermoli = new ParkingPlace();
                parcheggioTermoli.setCity("Termoli");
                parcheggioTermoli.setAddress("via saverio cannarsa, 7");
                parcheggioTermoli.setSpotsNumber(11);
                parcheggioTermoli.setLat(42.0019316);
                parcheggioTermoli.setLng(14.9924052);
                parcheggioTermoli.setMunicipality(municipalityRepository.findById((long) 2).orElseThrow(() -> new ItemNotFoundException((long) 2)));
                ParkingPlace saved = new ParkingPlace();
                saved = parkingPlaceRepository.save(parcheggioTermoli);

                for (int i = 0; i < saved.getSpotsNumber(); i++) {
                    ParkingSpot s = new ParkingSpot();
                    s.setLevel(0);
                    s.setParkingPlaceID(saved.getParkingPlaceID());
                    s.setProgressiveNumber(i + 1);
                    s.setReservations(new HashSet<Reservation>());
                    parkingSpotRepository.save(s);
                }

                ParkingPlace parcheggioTermoli2 = new ParkingPlace();
                parcheggioTermoli2.setCity("Termoli");
                parcheggioTermoli2.setAddress("Via XX Settembre, 79");
                parcheggioTermoli2.setSpotsNumber(22);
                parcheggioTermoli2.setLat(42.0025121);
                parcheggioTermoli2.setLng(14.991163);
                parcheggioTermoli2.setMunicipality(municipalityRepository.findById((long) 2).orElseThrow(() -> new ItemNotFoundException((long) 2)));
                saved = new ParkingPlace();
                saved = parkingPlaceRepository.save(parcheggioTermoli2);

                for (int i = 0; i < saved.getSpotsNumber(); i++) {
                    ParkingSpot s = new ParkingSpot();
                    s.setLevel(0);
                    s.setParkingPlaceID(saved.getParkingPlaceID());
                    s.setProgressiveNumber(i + 1);
                    s.setReservations(new HashSet<Reservation>());
                    parkingSpotRepository.save(s);
                }
            }

            if (policemanRepository.count() == ((long) 0)) {
                Policeman franco = new Policeman();
                franco.setMunicipality(municipalityRepository.findById((long) 2).orElseThrow(() -> new ItemNotFoundException((long) 2)));
                franco.setName("Franco");
                franco.setSurname("Verdonzi");
                franco.setEmail("franco.verdonzi@gmail.com");
                franco.setUsername("FrancoIlGrande");
                franco.setPhoneNumber("00992476456");
                franco.setRole(ApplicationUserRole.POLICEMAN);
                franco.setPassword(passwordEncoder.encode("ilmagnificofranco"));


                policemanRepository.save(franco);

                Policeman basso = new Policeman();
                basso.setMunicipality(municipalityRepository.findById((long) 2).orElseThrow(() -> new ItemNotFoundException((long) 2)));
                basso.setName("Basso");
                basso.setSurname("Caruso");
                basso.setEmail("basso.caruso@gmail.com");
                basso.setUsername("BassoCaruso");
                basso.setPhoneNumber("00992478787");
                basso.setRole(ApplicationUserRole.POLICEMAN);
                basso.setPassword(passwordEncoder.encode("bassocaruso"));

                policemanRepository.save(basso);

                
                Vehicle v= new Vehicle();
                v.setBrand("Fiat Panda");
                v.setVehiclePlate("BZ555SB");
                v.setType(VehicleType.CAR);
                vehicleRepository.save(v);
                Driver d = driverRepository.findById((long)3).orElseThrow(() -> new ItemNotFoundException((long) 3));
                Set<Vehicle> set = new HashSet<Vehicle>();
                set.add(v);
                d.setVehicle_owned(set);
                driverRepository.save(d);
                
                // TEST PUSH
                
                Reservation r= new Reservation();
                r.setStartingTime(new Timestamp(System.currentTimeMillis()));
                r.setEndingTime(new Timestamp((System.currentTimeMillis()+(long)6000000)));
                ParkingSpot spottino= parkingSpotRepository.findById((long)17).orElseThrow(() -> new ItemNotFoundException((long) 17));
                r.setParkingSpot(spottino);
                r.setVehicle(vehicleRepository.findById("BZ555SB").orElseThrow(() -> new ItemNotFoundException("BZ555SB")));


                reservationRepository.save(r);
           
            }
        };


    }
}
