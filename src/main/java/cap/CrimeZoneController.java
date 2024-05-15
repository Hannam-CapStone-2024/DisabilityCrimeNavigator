package cap;

import cap.Class.CrimeZone;
import cap.Support.CrimeType;
import cap.Support.CsvLoader;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CrimeZoneController
{
    @GetMapping("/GetCrimeZone")
    public String GetCrimeZone() {
        for (CrimeZone zone : GetCrimeZones()) {
            System.out.println("Latitude: " + zone.lon);
            System.out.println("Longitude: " + zone.lat);
            System.out.println("Radius: " + zone.radius);
            System.out.println("Name: " + zone.crimeType);
            System.out.println("Crime Level: " + zone.grade);
            System.out.println("------------------------");
        }

        ObjectMapper mapper = new ObjectMapper();
        String jsonResult;
        try {
            jsonResult = mapper.writeValueAsString(GetCrimeZones());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            jsonResult = "{\"error\": \"Error processing crime zones\"}";
        }
        System.out.println("jsonResult: " + jsonResult);
        return jsonResult;
    }

    @GetMapping("/TestCrime")
    public String TestCrime() {
        return GetCrimeZones().toString();
    }

    public ArrayList<CrimeZone> GetCrimeZones()
    {
        ArrayList<CrimeZone> crimeZones = new ArrayList<>();
        var csvLoader = CsvLoader.readCSV("src/main/java/cap/DB/CrimePoint_within3km.csv");

        for (List<String> arr : csvLoader) {
            CrimeZone crimeZone = parseCrimeZone(arr.toArray(new String[0]));
            crimeZones.add(crimeZone);
        }
        return crimeZones;
    }

    private CrimeZone parseCrimeZone(String[] arr) {
        double latitude = Double.parseDouble(arr[0].trim().replace("\uFEFF", ""));
        double longitude = Double.parseDouble(arr[1].trim());
        double radius = Double.parseDouble(arr[2].trim());
        String name = arr[3];
        int crimeLevel = Integer.parseInt(arr[4].trim());
        return new CrimeZone(latitude, longitude, radius, CrimeType.fromValue(name), crimeLevel);
    }



    static CrimeZoneController instance;

    public static CrimeZoneController GetInstance()
    {
        if(instance == null)
        {
            instance = new CrimeZoneController();
            instance.GetCrimeZones();
        }
        return instance;
    }

    public CrimeZoneController()
    {

    }
}
