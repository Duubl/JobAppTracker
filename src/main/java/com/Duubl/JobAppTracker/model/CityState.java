package com.Duubl.JobAppTracker.model;

public class CityState {
    private String city;
    private String state;
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

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public boolean isRemote() { return isRemote; }
    public void setRemote(boolean isRemote) { this.isRemote = isRemote; }
}
