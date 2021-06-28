package com.spmproject.smartparking.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

//to fetch users from the db
@Service
public class ApplicationUserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Email sent is " + email);

        User user = userRepository.findByEmail(email);
        if (user == null) {
            System.out.println("Utente non trovato");
            throw new UsernameNotFoundException(email);
        }
        String token = UUID.randomUUID().toString();
        user.setToken(token);
        userRepository.save(user);

        System.out.println("L'utente trovato è " + user);
        return ApplicationUser.build(user);
    }
}
