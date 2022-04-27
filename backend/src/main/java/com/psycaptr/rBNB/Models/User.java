package com.psycaptr.rBNB.Models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.psycaptr.rBNB.Services.AuthService;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class User {
    private String id = null;
    private String firstName;
    private String lastName;
    private String email;
    private Password password;
    private List<String> propertiesId = new ArrayList<>();
    private List<String> contractsId = new ArrayList<>();

    public User(String id, String firstName, String lastName, String email, Password password, List<String> propertiesId, List<String> contractsId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.propertiesId = propertiesId;
        this.contractsId = contractsId;
    }

    public User(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    @JsonCreator
    public User(String firstName, String lastName, String email, String rawPassword) throws InvalidKeySpecException, NoSuchAlgorithmException, SQLException {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        generateHashedPassword(rawPassword);
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

    public Password getPassword() {
        return password;
    }

    public void setPassword(Password password) {
        this.password = password;
    }

    public void generateHashedPassword(String rawPassword) throws InvalidKeySpecException, NoSuchAlgorithmException, SQLException {
        AuthService authService = new AuthService();
        this.password = authService.newHashPassword(rawPassword);
    }

    public List<String> getPropertiesId() {
        return propertiesId;
    }

    public void setPropertiesId(List<String> propertiesId) {
        this.propertiesId = propertiesId;
    }

    public List<String> getContractsId() {
        return contractsId;
    }

    public void setContractsId(List<String> contractsId) {
        this.contractsId = contractsId;
    }
}
