package com.spmproject.smartparking.auth;

import com.spmproject.smartparking.security.ApplicationUserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class ApplicationUser implements UserDetails {
	private Long id;
	private String email;
	private String username;
	private String password;
	private Set<? extends GrantedAuthority> grantedAuthorities;


	public ApplicationUser(User user, Set<? extends GrantedAuthority> grantedAuthorities) {
		this.email = user.getEmail();
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.grantedAuthorities = grantedAuthorities;

	}

	public static ApplicationUser build(User user) {
		Set<SimpleGrantedAuthority> grantedAuthorities = user.getRole().getGrantedAuthorities();
		return new ApplicationUser(
				user,
				grantedAuthorities
				);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return grantedAuthorities;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ApplicationUser user = (ApplicationUser) o;
		return Objects.equals(id, user.id);
	}
}
