package com.psycaptr.rBNB.User;

import com.psycaptr.rBNB.Contract.Contract;
import com.psycaptr.rBNB.Property.Property;

import java.util.Collection;

public class User {
    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private Collection<Property> properties;
    private Collection<Contract> contracts;

    public User(String id, String firstname, String lastname, String email, Collection<Property> properties, Collection<Contract> contracts) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.properties = properties;
        this.contracts = contracts;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
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
}
