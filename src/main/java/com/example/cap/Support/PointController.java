package com.example.cap.Support;

import com.example.cap.Class.Point;
import com.example.cap.Support.CsvLoader;
import com.example.cap.controller.PointLoader;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class PointController {

    private static final PointController instance = new PointController();

    public static PointController getInstance() {
        if(instance.pointList == null)
        {
            instance.pointList = instance.LoadPoints();
        }
        return instance;
    }
    
    private PointController() {}

    List<Point> pointList;

    public List<Point> LoadPoints()
    {
        List<Point> pointList = new ArrayList<Point>();
        List<List<String>> csvList = CsvLoader.readCSV("");

        int id;
        int x;
        int y;
        String name;
        String descript;

        for (List<String> strings : csvList) {
            id = Integer.parseInt(strings.get(0));
            x = Integer.parseInt(strings.get(1));
            y = Integer.parseInt(strings.get(2));
            name = strings.get(3);
            descript = strings.get(4);

            pointList.add(new Point(id, x, y, name, descript));
        }
        return pointList;
    }
}
