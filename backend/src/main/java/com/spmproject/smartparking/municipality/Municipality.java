package com.spmproject.smartparking.municipality;
import com.spmproject.smartparking.auth.User;
import com.spmproject.smartparking.policeman.Policeman;
import com.spmproject.smartparking.security.ApplicationUserRole;
import lombok.*;

import java.util.HashSet;
import java.util.Random;
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
	
    String districtCode;
	
	public Municipality(String name, String email, String username, String password, String phoneNumber) {
		super(name, email, username, password, phoneNumber, ApplicationUserRole.MUNICIPALITY);
	
		policemenList = new HashSet<Policeman>();

		int interoMistico=0;
		for(int i=0; i<email.length();i++) {
			char carbone = email.charAt(i);
			int mamma = (int) carbone;
			interoMistico = interoMistico+mamma;
		}
		
		Random r= new Random();
	    int randomInt= r.nextInt(8);
	    randomInt=randomInt+31;	
		interoMistico=interoMistico*randomInt;
		String stringaMistica = String.valueOf(interoMistico);
		StringBuffer s= new StringBuffer("");
		s.append(stringaMistica.charAt(0));
		s.append(stringaMistica.charAt(1));
		s.append(stringaMistica.charAt(2));
		s.append(stringaMistica.charAt(3));
		this.districtCode=s.toString();

	}
}
