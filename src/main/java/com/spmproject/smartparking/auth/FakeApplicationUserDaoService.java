package com.spmproject.smartparking.auth;

import com.google.common.collect.Lists;
import com.spmproject.smartparking.security.ApplicationUserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.spmproject.smartparking.security.ApplicationUserRole.*;

@Repository("fake")
public class FakeApplicationUserDaoService implements ApplicationUserDao {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public FakeApplicationUserDaoService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        return getApplicationUsers().stream().filter(applicationUser -> username.equals(applicationUser.getUsername()))
                .findFirst();
    }

    private List<ApplicationUser> getApplicationUsers() {
       List<ApplicationUser> applicationUsers = Lists.newArrayList(
               new ApplicationUser(
                       "alessandro",
                       passwordEncoder.encode("password"),
                       DRIVER.getGrantedAuthorities(),
                       true,
                       true,
                       true,
                       true

               ),
               new ApplicationUser(
                       "pasqualino",
                       passwordEncoder.encode("password"),
                       POLICEMAN.getGrantedAuthorities(),
                       true,
                       true,
                       true,
                       true

               ),
               new ApplicationUser(
                       "grottammare",
                       passwordEncoder.encode("password"),
                       MUNICIPALITY.getGrantedAuthorities(),
                       true,
                       true,
                       true,
                       true

               ),
               new ApplicationUser(
                       "admin",
                       passwordEncoder.encode("password"),
                       ADMIN.getGrantedAuthorities(),
                       true,
                       true,
                       true,
                       true

               )
       );
       return applicationUsers;
    }
}
