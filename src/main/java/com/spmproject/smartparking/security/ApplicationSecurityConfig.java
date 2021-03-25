package com.spmproject.smartparking.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import static com.spmproject.smartparking.security.ApplicationUserRole.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
                .antMatchers("/driver/**").hasRole(DRIVER.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic()
        ;
    }

    @Bean
    protected UserDetailsService userDetailsService() {
        UserDetails alessandroUser = User.builder()
                .username("alessandro")
                .password(passwordEncoder.encode("password"))
                //.roles(DRIVER.name())
                .authorities(DRIVER.getGrantedAuthorities())
                .build();

        UserDetails pasqualinoUser = User.builder()
                .username("pasqualino")
                .password(passwordEncoder.encode("password"))
                //.roles(POLICEMAN.name())
                .authorities(POLICEMAN.getGrantedAuthorities())
                .build();

        UserDetails grottammareUser = User.builder()
                .username("grottammare")
                .password(passwordEncoder.encode("password"))
                //.roles(MUNICIPALITY.name())
                .authorities(MUNICIPALITY.getGrantedAuthorities())
                .build();

        UserDetails capoUser = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("password"))
                .authorities(ADMIN.getGrantedAuthorities())
                .build();

        return new InMemoryUserDetailsManager(
                alessandroUser,
                pasqualinoUser,
                grottammareUser,
                capoUser
        );
    }
}
