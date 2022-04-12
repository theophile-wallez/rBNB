package com.psycaptr.rBNB.User;

import com.psycaptr.rBNB.Contract.Contract;
import com.psycaptr.rBNB.Property.Property;

import java.util.Collection;

public class User {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private Collection<Property> properties;
    private Collection<Contract> contracts;

    public User(String id, String firstName, String lastName, String email, Collection<Property> properties, Collection<Contract> contracts) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.properties = properties;
        this.contracts = contracts;
    }

    public User(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public User() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<Property> getProperties() {
        return properties;
    }

    public void setProperties(Collection<Property> properties) {
        this.properties = properties;
    }

    public Collection<Contract> getContracts() {
        return contracts;
    }

    public void setContracts(Collection<Contract> contracts) {
        this.contracts = contracts;
    }

//    public String getFullName() {
//        return firstName + " " + lastName;
//    }
}
