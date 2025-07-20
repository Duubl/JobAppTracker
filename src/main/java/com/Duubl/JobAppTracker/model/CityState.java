package com.Duubl.JobAppTracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class CityState {

    @Column(name = "city", nullable = false, length = 255)
    private String city;

    @Column(name = "state", nullable = false, length = 255)
    private String state;

    @Column(name = "is_remote", nullable = false)
    private boolean isRemote;

    public CityState(String city, String state, boolean isRemote) {
        this.city = city;
        this.state = state;
        this.isRemote = isRemote;
    }

    public CityState(boolean isRemote) {
        this.city = "Remote";
        this.state = "Remote";
        this.isRemote = isRemote;
    }

    // Default constructor required for @Embeddable
    public CityState() {
    }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public boolean isRemote() { return isRemote; }
    public void setRemote(boolean isRemote) { this.isRemote = isRemote; }
}
