package com.psycaptr.rBNB.Models;

import java.util.List;

public class Property {
    private String id;
    private String ownerId;
    private HousingType housingType;
    private Location location;
    private String description;
    private int bedAmount;
    private int squareFootage;
    private float pricePerDay;
    private boolean isListed;

    public List<String> getServices() {
        return services;
    }

    public void setServices(List<String> services) {
        this.services = services;
    }

    public List<String> getConstraints() {
        return constraints;
    }

    public void setConstraints(List<String> constraints) {
        this.constraints = constraints;
    }

    private List<String> services;
    private List<String> constraints;

    public Property(String id, String ownerId, HousingType housingType, Location location, String description, int bedAmount, int squareFootage, float pricePerDay) {
        this.id = id;
        this.ownerId = ownerId;
        this.housingType = housingType;
        this.location = location;
        this.description = description;
        this.bedAmount = bedAmount;
        this.squareFootage = squareFootage;
        this.pricePerDay = pricePerDay;
    }

    public Property(String ownerId, Location location, int bedAmount, int squareFootage, float pricePerDay) {
        this.ownerId = ownerId;
        this.location = location;
        this.bedAmount = bedAmount;
        this.squareFootage = squareFootage;
        this.pricePerDay = pricePerDay;
        this.id = null;
        this.housingType = HousingType.house; //default
    }

    public Property() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public HousingType getHousingType() {
        return housingType;
    }

    public void setHousingType(HousingType housingType) {
        this.housingType = housingType;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getBedAmount() {
        return bedAmount;
    }

    public void setBedAmount(int bedAmount) {
        this.bedAmount = bedAmount;
    }

    public int getSquareFootage() {
        return squareFootage;
    }

    public void setSquareFootage(int squareFootage) {
        this.squareFootage = squareFootage;
    }

    public float getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(float pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public boolean getIsListed() {
        return isListed;
    }

    public void setIsListed(boolean listed) {
        isListed = listed;
    }
}
