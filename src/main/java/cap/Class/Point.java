package cap.Class;

public class Point {
    private double latitude;
    private double longitude;
    private double radius;
    private String name;
    private int crimeLevel;

    public Point(double latitude, double longitude, double radius, String name, int crimeLevel) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.name = name;
        this.crimeLevel = crimeLevel;
    }

    // Getters
    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getRadius() {
        return radius;
    }

    public String getName() {
        return name;
    }

    public int getCrimeLevel() {
        return crimeLevel;
    }

    // Setters
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCrimeLevel(int crimeLevel) {
        this.crimeLevel = crimeLevel;
    }
}
