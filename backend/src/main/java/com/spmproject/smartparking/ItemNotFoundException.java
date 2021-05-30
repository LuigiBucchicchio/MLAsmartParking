package com.spmproject.smartparking;

public class ItemNotFoundException extends RuntimeException{

	public ItemNotFoundException (Long id) {
		super("Could not find the item with id: " + id);
	}
	public ItemNotFoundException (String id) {
		super("Could not find the item with id or username: " + id);
	}
}
