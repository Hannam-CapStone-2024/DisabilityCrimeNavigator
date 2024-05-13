package cap.Manager;

import cap.Class.Point;
import cap.Support.CsvLoader;

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

    //1.포인트 입력시,
    public String SearchPoint(Point StartPoint, Point EndPoint)
    {
        //1.포인트를 입력받아 정렬기에 넣어줌
        var it = GetSortPoints();
        //2.정렬된 포인트를 받은 뒤, 프론트에서 사용하기 쉽게 정리 후 반환
        return ConvertPoint2API(it);
    }

    private List<Point> GetSortPoints()
    {
        return null;
    }
    private String ConvertPoint2API(List<Point> points)
    {
        return null;
    }

    private PointController() {}

    private List<Point> pointList;

    private List<Point> LoadPoints()
    {
        List<Point> pointList = new ArrayList<Point>();
        List<List<String>> csvList = CsvLoader.readCSV("src/main/java/com/example/cap/DB/PointDB.csv");

        int id;
        double x;
        double y;
        String name;
        int level;

        for (List<String> strings : csvList) {
            id = Integer.parseInt(strings.get(0));
            x = Double.parseDouble(strings.get(1));
            y = Double.parseDouble(strings.get(2));
            name = strings.get(3);
            level = Integer.parseInt(strings.get(4));

            pointList.add(new Point(id, x, y, name, level));
        }
        return pointList;
    }
}
