package com.psycaptr.rBNB.Models;

import java.time.LocalDate;

public class Contract {
    private String id;
    private String ownerId;
    private String tenantId;
    private LocalDate startingDay;
    private LocalDate endingDay;
    private String propertyId;

    public Contract(String ownerId, String tenantId, LocalDate startingDay, LocalDate endingDay, String propertyId, String id) {
        this.id = id;
        this.ownerId = ownerId;
        this.tenantId = tenantId;
        this.startingDay = startingDay;
        this.endingDay = endingDay;
        this.propertyId = propertyId;
    }



    public Contract() {
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

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public LocalDate getStartingDay() {
        return startingDay;
    }

    public void setStartingDay(LocalDate startingDay) {
        this.startingDay = startingDay;
    }

    public LocalDate getEndingDay() {
        return endingDay;
    }

    public void setEndingDay(LocalDate endingDay) {
        this.endingDay = endingDay;
    }

    public String getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(String propertyId) {
        this.propertyId = propertyId;
    }
}
