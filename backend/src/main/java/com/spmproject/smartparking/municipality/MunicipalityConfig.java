package com.spmproject.smartparking.municipality;

import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.auth.UserRepository;
import com.spmproject.smartparking.driver.Driver;
import com.spmproject.smartparking.driver.DriverRepository;
import com.spmproject.smartparking.security.ApplicationUserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Configuration
public class MunicipalityConfig {

    @Bean
    CommandLineRunner commandLineRunner(MunicipalityRepository municipalityRepository, DriverRepository driverRepository, UserRepository userRepository) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        return args -> {
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

            Driver valerio = new Driver(
                    "Valerio",
                    "Lundini",
                    "valerio.lundini@gmail.com",
                    "noMaFalloUnUtente",
                    "eraMeglioIlLibro",
                    "332244566"
            );
            Driver michela = new Driver(
                    "Michela",
                    "Giraud",
                    "michela.giraud@gmail.com",
                    "ilMignottonePazzo",
                    "ilSalottoConMichela",
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

            User bianchi = new User(
                    12375678910L,
                    "driver",
                    "driver@gmail.com",
                    "driver",
                    passwordEncoder.encode("pass"),
                    "jkd",
                    ApplicationUserRole.DRIVER
            );

            User rapsodia = new User(
                    12345678910L,
                    "admin",
                    "admin@gmail.com",
                    "admin",
                    passwordEncoder.encode("pass"),
                    "jkd",
                    ApplicationUserRole.ADMIN
            );

            userRepository.saveAll(List.of(bianchi, rapsodia));
        };
    }
}
