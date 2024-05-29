package cap.Support;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import cap.Class.WeekType;

public class Average {
    Map<CrimeType, Map<WeekType, Double>> crimeData = new HashMap<>();

    public Average() throws IOException {
        List<List<String>> crimeDataArray = CsvLoader.readCSV("src/main/java/cap/DB/CrimeDays.csv");

        for (List<String> row : crimeDataArray) {
            CrimeType crimeType = CrimeType.fromValue(row.get(0));
            Map<WeekType, Double> dayData = new HashMap<>();
            for (int i = 1; i < row.size(); i++) {
                dayData.put(WeekType.values()[i - 1], Double.parseDouble(row.get(i).trim()));
            }
            crimeData.put(crimeType, dayData);
        }
    }

    public double get(CrimeType crimeType, WeekType day) {
        if (!crimeData.containsKey(crimeType)) {
            return 1; // Invalid crime type
        }

        Map<WeekType, Double> dayData = crimeData.get(crimeType);
        if (!dayData.containsKey(day)) {
            return 1; // Invalid day of the week
        }

        double sum = 0;
        for (WeekType d : WeekType.values()) {
            sum += dayData.get(d);
        }
        double average = sum / WeekType.values().length;
        double value = dayData.get(day);
        return value / average;
    }
}
