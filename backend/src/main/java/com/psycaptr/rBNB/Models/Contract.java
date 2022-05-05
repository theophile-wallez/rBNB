package com.psycaptr.rBNB.Models;

public class Contract {
    private String id;
    private String ownerId;
    private String tenantId;
    private String startingDay;
    private String endingDay;
    private String propertyId;

    public Contract(String ownerId, String tenantId, String startingDay, String endingDay, String propertyId, String id) {
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

    public String getStartingDay() {
        return startingDay;
    }

    public void setStartingDay(String startingDay) {
        this.startingDay = startingDay;
    }

    public String getEndingDay() {
        return endingDay;
    }

    public void setEndingDay(String endingDay) {
        this.endingDay = endingDay;
    }

    public String getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(String propertyId) {
        this.propertyId = propertyId;
    }
}
