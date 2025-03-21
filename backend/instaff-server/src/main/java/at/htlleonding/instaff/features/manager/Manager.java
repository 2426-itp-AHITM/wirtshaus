package at.htlleonding.instaff.features.manager;

import at.htlleonding.instaff.features.company.Company;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String firstname;
    String lastname;
    String email;
    String telephone;
    String password;
    LocalDateTime birthdate;
    @ManyToOne
    Company company;
}
