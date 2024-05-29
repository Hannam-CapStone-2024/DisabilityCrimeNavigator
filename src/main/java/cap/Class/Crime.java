package cap.Class;

import cap.Manager.CriminalLoader;
import cap.Support.CrimeType;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static cap.Manager.CriminalLoader.Avg;

public class Crime
{
    public static CrimeState TotalState(TimeRange time, WeekType weekType) throws IOException {
        // 각 범죄 유형에 대한 평균 범죄 상태를 저장할 맵
        Map<CrimeType, CrimeState> crimeStateMap = new HashMap<>();

        // 모든 범죄 유형에 대해 EachState 메서드를 호출하여 평균 범죄 상태를 계산하고 맵에 저장
        for (CrimeType crimeType : CrimeType.values()) {
            CrimeState crimeState = EachState(crimeType, time, weekType);
            crimeStateMap.put(crimeType, crimeState);
        }

        // 모든 범죄 유형에 대한 평균 범죄 상태를 종합하여 최종 범죄 상태 계산
        double totalAvgCount = 0;
        for (CrimeState state : crimeStateMap.values()) {
            switch (state) {
                case LOW:
                    totalAvgCount += 0.33;
                    break;
                case MIDDLE:
                    totalAvgCount += 0.66;
                    break;
                case HIGH:
                    totalAvgCount += 1.0;
                    break;
            }
        }

        // 전체 평균 범죄 상태 계산
        double avgCrimeState = totalAvgCount / 6;
        System.out.println("avgCrimeState: " + avgCrimeState);
        // 평균 범죄 상태에 따른 최종 범죄 상태 반환
        return calculateCrimeState(avgCrimeState);
    }

    public static CrimeState EachState(CrimeType crimeType, TimeRange time, WeekType weekType) throws IOException {
        Map<CrimeType, Integer> crimeSumMap;
        try {
            crimeSumMap = Avg(); // 범죄 발생 데이터의 평균을 가져옴
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        // 주어진 범죄 유형에 해당하는 데이터가 있는지 확인
        if (!crimeSumMap.containsKey(crimeType)) {
            return CrimeState.LOW; // 해당 범죄 유형의 데이터가 없으면 범죄 상태를 LOW로 반환
        }

        // 해당 범죄 유형의 평균 값을 가져옴
        double avgCount = (double) CriminalLoader.GetCount(crimeType, time) / CriminalLoader.Avg().get(crimeType);
        System.out.println("CriminalLoader.GetCount(crimeType, time): " + CriminalLoader.GetCount(crimeType, time));
        System.out.println("CriminalLoader.Avg().get(crimeType): " + CriminalLoader.Avg().get(crimeType));
        System.out.println("avgCount: " + avgCount);
        System.out.println("-----------");
        // 시간대에 따른 범죄 발생을 확인하여 범죄 상태를 반환
        switch (time) {
            case MIDNIGHT_0_4:
                return calculateCrimeState(avgCount);
            case EARLY_MORNING_4_7:
                return calculateCrimeState(avgCount);
            case MORNING_7_12:
                return calculateCrimeState(avgCount);
            case AFTERNOON_12_18:
                return calculateCrimeState(avgCount);
            case EVENING_18_20:
                return calculateCrimeState(avgCount);
            case NIGHT_20_24:
                return calculateCrimeState(avgCount);
            default:
                return CrimeState.LOW; // 기본적으로는 LOW 상태 반환
        }
    }


    private static CrimeState calculateCrimeState(double avgCount) {
        if (avgCount <= 0.7) {
            return CrimeState.LOW;
        } else if (avgCount <= 1.5) {
            return CrimeState.MIDDLE;
        } else {
            return CrimeState.HIGH;
        }
    }
}
