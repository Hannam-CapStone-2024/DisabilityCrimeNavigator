package com.example.cap.Support;

public class CrimeZone {

    public CrimeZone(double lat, double lon, double radius, String crimeType, int grade)
    {
        this.lat = lat;
        this.lon = lon;
        this.radius = radius;
        this.crimeType = ConvertCrimeType(crimeType);
        this.grade = grade;
    }
    double lat;
    double lon;
    double radius;
    CrimeType crimeType;
    int grade;

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

    public double GetLat()
    {
        return lat;
    }
    public double GetLon()
    {
        return lon;
    }
    public double GetRadius()
    {
        return radius;
    }
    public CrimeType GetCrimeType()
    {
        return crimeType;
    }
    public long GetGrade()
    {
        return grade;
    }


}
