package com.spmproject.smartparking.municipality;
import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.policeman.Policeman;
import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@ToString(callSuper=true)
@NoArgsConstructor
@Table
public class Municipality extends User
{
	
	@OneToMany
	Set<Policeman> policemenList;
	
	public Municipality(String name, String email, String username, String password, String phoneNumber) {
		super(name, email, username, password, phoneNumber, ApplicationUserRole.MUNICIPALITY);
	
		policemenList = new HashSet<Policeman>();
	}
}
