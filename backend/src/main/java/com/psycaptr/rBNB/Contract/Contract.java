package com.psycaptr.rBNB.Contract;

import com.psycaptr.rBNB.Property.Property;
import com.psycaptr.rBNB.User.User;

import java.util.Calendar;

public class Contract {
    private User owner;
    private User tenant;
    private Calendar startingDay;
    private Calendar endingDay;
    private Property property;
    private Long id;

    public Contract(User owner, User tenant, Calendar startingDay, Calendar endingDay,Property property, Long id) {
        this.owner = owner;
        this.tenant = tenant;
        this.startingDay = startingDay;
        this.endingDay = endingDay;
        this.id = id;
        this.property = property;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public User getTenant() {
        return tenant;
    }

    public void setTenant(User tenant) {
        this.tenant = tenant;
    }

    public Calendar getStartingDay() {
        return startingDay;
    }

    public void setStartingDay(Calendar startingDay) {
        this.startingDay = startingDay;
    }

    public Calendar getEndingDay() {
        return endingDay;
    }

    public void setEndingDay(Calendar endingDay) {
        this.endingDay = endingDay;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}
