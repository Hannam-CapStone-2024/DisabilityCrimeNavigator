package com.example.cap.Class;

public class Point
{
    private int id;
    private int x;
    private int y;
    private String name;
    private String descript;

   public Point(int id, int x, int y, String name, String descript)
   {
       this.id = id;
       this.x = x;
       this.y = y;
       this.name = name;
       this.descript = descript;
   }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public String getName() {
        return name;
    }

    public String getDescript() {
        return descript;
    }

    public int getId() {
        return id;
    }
}
