package com.spmproject.smartparking.policeman;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UnassignmentPayload {

    private String policemanName;


    public UnassignmentPayload(String policemanName) {
        this.policemanName = policemanName;
    }
}
