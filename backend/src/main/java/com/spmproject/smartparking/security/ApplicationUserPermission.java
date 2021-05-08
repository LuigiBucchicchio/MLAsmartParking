package com.spmproject.smartparking.security;

public enum ApplicationUserPermission {
	DRIVER_READ("driver:read"),
	DRIVER_WRITE("driver:write"),
	PARKING_SPOT_READ("parkingSpot:read"),
	PARKING_SPOT_WRITE("parkingSpot:write"),
	PARKING_PLACE_READ("parkingPlace:read"),
	PARKING_PLACE_WRITE("parkingPlace:write"),
	POLICEMAN_READ("policeman:read"),
	POLICEMAN_WRITE("policeman:write"),
	MUNICIPALITY_READ("municipality:read"),
	MUNICIPALITY_WRITE("municipality:write");

	private final String permission;

	ApplicationUserPermission(String permission) {
		this.permission = permission;
	}

	public String getPermission() {
		return permission;
	}
}
