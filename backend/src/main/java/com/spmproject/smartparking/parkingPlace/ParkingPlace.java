package com.spmproject.smartparking.parkingPlace;

import com.spmproject.smartparking.municipality.Municipality;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "ParkingPlace")
@Data
@NoArgsConstructor
@Table(name = "parking_place")
public class ParkingPlace {

	@SequenceGenerator(
			name = "parking_place_sequence",
			sequenceName = "parking_place_sequence",
			allocationSize = 1
			)
	@GeneratedValue(
			strategy = SEQUENCE,
			generator = "parking_place_sequence"
			)
	@Column(
			name = "id",
			updatable = false
			)
	@Id
	private Long parkingPlaceID;

	@Column(name = "spots_number", nullable = false)
	private int spotsNumber;

	//private int levelsNumber;

	@Column(nullable = false)
	private String address;

	@ManyToOne
	@JoinColumn(name = "municipality_id", referencedColumnName = "id", nullable = false)
	private Municipality municipality;

}
