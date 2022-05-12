package com.psycaptr.rBNB.Models;

public class Contract {
    private String id;
    private String ownerId;
    private String tenantId;
    private String checkInDate;
    private String checkOutDate;
    private String propertyId;
    private Boolean isAccepted = false;

    public Contract(String ownerId, String tenantId, String checkInDate, String checkOutDate, String propertyId, String id) {
        this.id = id;
        this.ownerId = ownerId;
        this.tenantId = tenantId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
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

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(String propertyId) {
        this.propertyId = propertyId;
    }

    public Boolean getAccepted() {
        return isAccepted;
    }

    public void setAccepted(Boolean accepted) {
        isAccepted = accepted;
    }
}
