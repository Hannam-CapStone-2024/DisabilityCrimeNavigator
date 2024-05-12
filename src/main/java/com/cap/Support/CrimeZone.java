package com.cap.Support;

import java.io.Serializable;

public class CrimeZone implements Serializable {

    public CrimeZone() {}
    public CrimeZone(double lat, double lon, double radius, String crimeType, int grade)
    {
        this.lat = lat;
        this.lon = lon;
        this.radius = radius;
        this.crimeType = ConvertCrimeType(crimeType);
        this.grade = grade;
    }
    public double lat;
    public double lon;
    public double radius;
    public CrimeType crimeType;
    public int grade;

    private CrimeType ConvertCrimeType(String str)
    {
        switch (str)
        {
            case "Robbery":
                return CrimeType.Robbery;
            case "Murder":
                return CrimeType.Murder;
            case "Sexual_Violence":
                return CrimeType.Sexual_Violence;
            case "Violence":
                return CrimeType.Violence;
        }
        return null;
    }



}
