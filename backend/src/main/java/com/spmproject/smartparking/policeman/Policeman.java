package com.spmproject.smartparking.policeman;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.municipality.Municipality;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;

import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Policeman extends User {

    @ManyToOne
    private Municipality municipality;

    private String surname;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "assignedParkingPlaceID", referencedColumnName = "id")
    private ParkingPlace assignedParkingPlace;


    Policeman(String name, String surname, String email, String username, String password, String phoneNumber) {
        super(name, email, username, password, phoneNumber, ApplicationUserRole.POLICEMAN);
        this.surname = surname;
        this.setRole(ApplicationUserRole.POLICEMAN);
    }

}
