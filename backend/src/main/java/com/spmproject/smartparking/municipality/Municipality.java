package com.spmproject.smartparking.municipality;
import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.policeman.Policeman;
import com.spmproject.smartparking.parkingPlace.ParkingPlace;
import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Set;
import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@NoArgsConstructor
@Table
public class Municipality extends User
{
    public Municipality(String name, String email, String username, String password, String phoneNumber) {
        super(name, email, username, password, phoneNumber, ApplicationUserRole.MUNICIPALITY);
    }
}
