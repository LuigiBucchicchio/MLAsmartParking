package com.spmproject.smartparking.reservation;

import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.spmproject.smartparking.parkingspot.ParkingSpot;
import com.spmproject.smartparking.parkingspot.ParkingSpotService;

@Configuration
@EnableScheduling
public class ReservationCheckService {
	private static int check =0;
	
	private ParkingSpotService parkingSpotService;
	private ReservationService reservationService;
	
	@Autowired
	public ReservationCheckService(ParkingSpotService parkingSpotService,
			ReservationService reservationService) {
		this.parkingSpotService=parkingSpotService;
		this.reservationService=reservationService;
	}
	
	@Scheduled(fixedDelay = 1800000, initialDelay = 20000)
	public void reservationCheck() {
		check ++;
		System.out.println("Reservation Check Routine Started: number "+check);
		Reservation r=null;
		ParkingSpot ps=null;
		List<Reservation> reservations = this.reservationService.getAllReservations();
		Iterator<Reservation> it = reservations.iterator();
		while(it.hasNext()) {
			r = it.next();
			if(r.getEndingTime().before(new Timestamp(System.currentTimeMillis()))) {
				ps= r.getParkingSpot();
				ps.setFree(true);
				this.parkingSpotService.addNewParkingSpot(ps);
				this.reservationService.addNewReservation(r);
			}
			//else nothing
		}
		r=null;
		ps=null;
		reservations=null;
		it=null;
	}
	

}
