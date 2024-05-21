package cap.Manager;

import cap.Class.CrimeRecord;
import cap.Support.CrimeType;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class CriminalLoader {

    public static List<CrimeRecord> Data() throws IOException {
        var dataArray = convertJsonToCrimeRecords(readFileAsString("src/main/java/cap/DB/CrimeData.json"));
        Map<CrimeType, CrimeRecord> crimeRecordMap = new HashMap<>();
        for (int i = 0; i < dataArray.size(); i++) {
            var it = dataArray.get(i);
            // 기존에 같은 범죄 유형의 기록이 있다면 Count를 누적, 없으면 새로운 CrimeRecord 생성
            if (crimeRecordMap.containsKey(it.category)) {
                CrimeRecord existingRecord = crimeRecordMap.get(it.category);
                existingRecord.night_20_24 += it.night_20_24;
                existingRecord.earlyMorning_4_7 += it.earlyMorning_4_7;
                existingRecord.midnight_0_4 += it.midnight_0_4;
                existingRecord.year += it.year;
                existingRecord.morning_7_12 += it.morning_7_12;
                existingRecord.afternoon_12_18 += it.afternoon_12_18;
                existingRecord.evening_18_20 += it.evening_18_20;
            } else {
                crimeRecordMap.put(it.category, it);
            }
        }
        return new ArrayList<>(crimeRecordMap.values());
    }



    public static String readFileAsString(String filePath) throws IOException {
        return new String(Files.readAllBytes(Paths.get(filePath)));
    }

    public static List<CrimeRecord> convertJsonToCrimeRecords(String jsonString) {
        List<CrimeRecord> crimeRecords = new ArrayList<>();

        JsonObject jsonObject = JsonParser.parseString(jsonString).getAsJsonObject();
        JsonArray dataArray = jsonObject.getAsJsonArray("data");

        for (int i = 0; i < dataArray.size(); i++) {
            JsonObject dataObject = dataArray.get(i).getAsJsonObject();

            int night_20_24 = dataObject.get("밤(20시-24시)").getAsInt();
            int earlyMorning_4_7 = dataObject.get("새     벽(4시-7시)").getAsInt();
            int midnight_0_4 = dataObject.get("심     야(0시-4시)").getAsInt();
            int year = dataObject.get("연도").getAsInt();
            int morning_7_12 = dataObject.get("오     전(7시-12시)").getAsInt();
            int afternoon_12_18 = dataObject.get("오     후(12시-18시)").getAsInt();
            int evening_18_20 = dataObject.get("초 저 녁(18시-20시)").getAsInt();
            CrimeType category = CrimeType.valueOf(translate(dataObject.get("항목").getAsString()));

            CrimeRecord crimeRecord = new CrimeRecord(night_20_24, earlyMorning_4_7, midnight_0_4, year,
                    morning_7_12, afternoon_12_18, evening_18_20, category);
            crimeRecords.add(crimeRecord);
        }

        return crimeRecords;
    }

    private static final Map<String, String> translationMap = new HashMap<>();
    static {
        translationMap.put("강도", "Robbery");
        translationMap.put("살인", "Murder");
        translationMap.put("성폭력", "Sexual_Violence");
        translationMap.put("폭력범", "Violence");
        translationMap.put("기타형법범", "Etc");
        translationMap.put("풍속범", "Moral");
        translationMap.put("지능범", "Intelli");
        translationMap.put("강력범", "Violent");
        translationMap.put("절도범", "Theft");
        translationMap.put("특별법범", "Special");
        translationMap.put("없음", "None");
    }

    public static String translate(String koreanCrimeType) {
        return translationMap.getOrDefault(koreanCrimeType, "None");
    }
}
