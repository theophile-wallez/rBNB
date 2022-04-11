package com.psycaptr.rBNB.Property;

import com.psycaptr.rBNB.User.User;

public class Property {
    private Long id;
    private User owner;
    private HousingType housingType;
    private Location location;
    private String description;
    private int bedAmount;
    private int squareFootage;
    private float pricePerDay;

    public Property(Long id, User owner, HousingType housingType, Location location, String description, int bedAmount, int squareFootage, float pricePerDay) {
        this.id = id;
        this.owner = owner;
        this.housingType = housingType;
        this.location = location;
        this.description = description;
        this.bedAmount = bedAmount;
        this.squareFootage = squareFootage;
        this.pricePerDay = pricePerDay;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
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
}
