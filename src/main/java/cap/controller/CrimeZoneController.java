package cap.controller;

import cap.Support.CrimeZone;
import cap.Support.CsvLoader;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CrimeZoneController
{
    @GetMapping("/testsss")
    public String GetCrimeZone() {
        // ObjectMapper를 사용하여 CrimeZone 객체 목록을 JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        /*
        try {
            System.out.println("API 키: " + crimeZones.toArray()[0]);
            return objectMapper.writeValueAsString(crimeZones);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }*/
        return "";
    }

    public void Init()
    {
        var csvLoader = CsvLoader.readCSV("src/main/java/cap/DB/CrimePoint_within3km.csv");

        for (List<String> arr : csvLoader) {
            CrimeZone crimeZone = parseCrimeZone(arr.toArray(new String[0]));
            crimeZones.add(crimeZone);
        }
    }

    private CrimeZone parseCrimeZone(String[] arr) {
        double latitude = Double.parseDouble(arr[0].trim().replace("\uFEFF", ""));
        double longitude = Double.parseDouble(arr[1].trim());
        double radius = Double.parseDouble(arr[2].trim());
        String name = arr[3];
        int crimeLevel = Integer.parseInt(arr[4].trim());
        return new CrimeZone(latitude, longitude, radius, name, crimeLevel);
    }

    private ArrayList<CrimeZone> crimeZones = new ArrayList<>();

    static CrimeZoneController instance;

    public static CrimeZoneController GetInstance()
    {
        if(instance == null)
        {
            instance = new CrimeZoneController();
            instance.Init();
        }
        return instance;
    }

    public CrimeZoneController()
    {

    }
}
