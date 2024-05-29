package cap.Support;

import cap.Support.CsvLoader;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class Average {
    String[] daysOfWeek = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

    CsvLoader csvLoader = new CsvLoader("cap/DB/CrimeDays.csv");
    String[][] crimeDataArray;
    try {
        crimeDataArray = csvLoader.loadCsv();
    } catch (IOException e) {
        e.printStackTrace();
        return;
    }

    Map<String, Map<String, Double>> crimeData = new HashMap<>();

    for (String[] row : crimeDataArray) {
        String crimeType = row[0];
        Map<String, Double> dayData = new HashMap<>();
        for (int i = 1; i < row.length; i++) {
            dayData.put(daysOfWeek[i - 1], Double.parseDouble(row[i].trim()));
        }
        crimeData.put(crimeType, dayData);
    }

    for (String crimeType : crimeData.keySet()) {
        System.out.println("CrimeType: " + crimeType);
        Map<String, Double> dayData = crimeData.get(crimeType);

        double sum = 0;
        for (String day : daysOfWeek) {
            sum += dayData.get(day);
        }
        double average = sum / daysOfWeek.length;

        for (String day : daysOfWeek) {
            double value = dayData.get(day);
            double averageOfValue = value / average;
        }
    }
}