package com.spmproject.smartparking.security;

import com.google.common.collect.Sets;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.spmproject.smartparking.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    DRIVER(Sets.newHashSet(
            PARKING_SPOT_READ,
            PARKING_PLACE_READ
    )),
    POLICEMAN(Sets.newHashSet(
            DRIVER_READ,
            PARKING_PLACE_READ,
            PARKING_PLACE_READ,
            POLICEMAN_READ
    )),
    MUNICIPALITY(Sets.newHashSet(
            DRIVER_READ,
            DRIVER_WRITE,
            PARKING_SPOT_READ,
            PARKING_SPOT_WRITE,
            PARKING_PLACE_READ,
            PARKING_PLACE_WRITE,
            POLICEMAN_READ,
            POLICEMAN_WRITE,
            MUNICIPALITY_READ
    )),
    ADMIN(Sets.newHashSet(
            DRIVER_READ,
            DRIVER_WRITE,
            PARKING_SPOT_READ,
            PARKING_SPOT_WRITE,
            PARKING_PLACE_READ,
            PARKING_PLACE_WRITE,
            POLICEMAN_READ,
            POLICEMAN_WRITE,
            MUNICIPALITY_READ,
            MUNICIPALITY_WRITE
    ));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));


        return permissions;
    }
}
