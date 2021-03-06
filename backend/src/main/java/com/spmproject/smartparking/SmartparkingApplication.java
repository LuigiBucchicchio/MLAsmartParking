package com.spmproject.smartparking;

import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.municipality.MunicipalityRepository;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.ForkJoinPool;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SmartparkingApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartparkingApplication.class, args);
    }

//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("parking-place/add").allowedOrigins("http://localhost:3000/");
//				registry.addMapping("parking-place/all").allowedOrigins("http://localhost:3000/");
//			}
//		};
//	}

}
