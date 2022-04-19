package com.psycaptr.rBNB.Models;

public class Location {
    private String country;
    private int zipCode;
    private String street;
    private int number;

    public Location(String country, int zipCode, String street, int number) {
        this.country = country;
        this.zipCode = zipCode;
        this.street = street;
        this.number = number;
    }

    public Location(){}

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
