import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class AverageCrime {

    {
        String[] daysOfWeek = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

        CsvLoader csvLoader = new CsvLoader("cap/DB/CrimeDays.csv");
        String[][] crimeDataArray;

        try {
            crimeDataArray = csvLoader.loadCsv();

            // 범죄 데이터 저장을 위한 Map
            Map<String, Map<String, Double>> crimeData = new HashMap<>();

            // CSV 데이터를 Map으로 변환
            for (String[] row : crimeDataArray) {
                String crimeType = row[0];
                Map<String, Double> dayData = new HashMap<>();
                for (int i = 1; i < row.length; i++) {
                    dayData.put(daysOfWeek[i - 1], Double.parseDouble(row[i].trim()));
                }
                crimeData.put(crimeType, dayData);
            }

            for (String crimeType : crimeData.keySet()) {
                System.out.println("Crime Type: " + crimeType);
                Map<String, Double> dayData = crimeData.get(crimeType);

                double sum = 0;
                for (String day : daysOfWeek) {
                    sum += dayData.get(day);
                }
                double average = sum / daysOfWeek.length;

                for (String day : daysOfWeek) {
                    double value = dayData.get(day);
                    double CrimeValueAverage = value / average;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public AverageCrime() {
    }

    public static void main(String[] args) {
        new AverageCrime();
    }
}
