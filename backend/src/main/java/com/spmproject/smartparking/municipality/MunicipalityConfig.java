package com.spmproject.smartparking.municipality;

import com.spmproject.smartparking.ItemNotFoundException;
import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.auth.UserRepository;
import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverRepository;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.parkingPlace.ParkingPlaceRepository;
import com.spmproject.smartparking.security.ApplicationUserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Configuration
public class MunicipalityConfig {

	@Bean
	CommandLineRunner commandLineRunner(MunicipalityRepository municipalityRepository, DriverRepository driverRepository, UserRepository userRepository, ParkingPlaceRepository parkingPlaceRepository) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		return args -> {

			if(municipalityRepository.count()==((long)0)) {

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

			if(driverRepository.count()==((long)0)) {
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
			if(parkingPlaceRepository.count()==((long)0)) {
				ParkingPlace parcheggioTermoli = new ParkingPlace();
				parcheggioTermoli.setAddress("via saverio cannarsa, 7");
				parcheggioTermoli.setSpotsNumber(11);
				parcheggioTermoli.setMunicipality(municipalityRepository.findById((long)2).orElseThrow(() -> new ItemNotFoundException((long)2)));
				parkingPlaceRepository.save(parcheggioTermoli);
			}

			if(userRepository.count()==((long)0)) {

			}
		};


	}
}
