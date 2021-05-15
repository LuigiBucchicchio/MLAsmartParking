package com.spmproject.smartparking.municipality;
import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.*;
import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@Table
public class Municipality extends User
{
	public Municipality(String name, String email, String username, String password, String phoneNumber) {
		super(name, email, username, password, phoneNumber, ApplicationUserRole.MUNICIPALITY);
	}
}
