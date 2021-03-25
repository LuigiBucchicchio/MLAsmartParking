package com.spmproject.smartparking.municipality;


import lombok.*;


import javax.persistence.*;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Municipality")
@Data
@NoArgsConstructor
@Table(
        name = "municipality",
        uniqueConstraints = {
                @UniqueConstraint(name = "municipality_email_unique", columnNames = "email")
        }
)
public class Municipality {

    @SequenceGenerator(
            name = "municipality_sequence",
            sequenceName = "municipality_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "municipality_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    @Id
    private Long id;

    @Column(
            nullable = false
    )
    private String name;

    @Column(
            nullable = false
    )
    private String email;

    @Column(
            nullable = false
    )
    private String password;

    @Column(
            name = "phone_number",
            nullable = false
    )
    private String phoneNumber;
/*
    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;
*/
    public Municipality(String name, String email, String password, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }



    @Override
    public String toString() {
        return "Municipality{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

}
