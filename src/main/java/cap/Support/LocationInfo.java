package cap.Support;

import cap.Class.CrimeZone;
import cap.CrimeZoneController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.geom.Point2D;

@RestController
public class LocationInfo
{
    @GetMapping("/isDanger")
    public static String isDanger(@RequestParam("pos") String nowPos)
    {
        if(getDangerCrimeZone(nowPos) != null)
        {
            return "true";
        }
        return "false";
    }
    @GetMapping("/DangerLevel")
    public static String DangerGrade(@RequestParam("pos") String nowPos)
    {
        return Integer.toString(getDangerCrimeZone(nowPos).grade);
    }

    //NowPos is String Type : "lon,lat"
    static CrimeZone getDangerCrimeZone(@RequestParam("pos") String nowPos)
    {
        for(var it : CrimeZoneController.GetInstance().GetCrimeZones())
        {
            var pos = nowPos.split(",");
            if(isPointInsideCircle(it.lon,it.lat,it.radius,Double.parseDouble(pos[0]), Double.parseDouble(pos[1])))
            {
                return it;
            }
        }
        return null;
    }


    public static boolean isPointInsideCircle(double centerX, double centerY, double radius, double pointX, double pointY) {
        Point2D.Double center = new Point2D.Double(centerX, centerY);
        Point2D.Double point = new Point2D.Double(pointX, pointY);

        double distance = center.distance(point);

        if (distance <= radius) {
            return true;
        } else {
            return false;
        }
    }
}
