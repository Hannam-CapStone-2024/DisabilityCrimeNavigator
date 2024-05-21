package cap.Class;

import cap.Support.CrimeType;

public class CrimeRecord {
    public int night_20_24;
    public int earlyMorning_4_7;
    public int midnight_0_4;
    public int year;
    public int morning_7_12;
    public int afternoon_12_18;
    public int evening_18_20;
    public CrimeType category;

    public CrimeRecord(int night_20_24, int earlyMorning_4_7, int midnight_0_4, int year,
                       int morning_7_12, int afternoon_12_18, int evening_18_20, CrimeType category) {
        this.night_20_24 = night_20_24;
        this.earlyMorning_4_7 = earlyMorning_4_7;
        this.midnight_0_4 = midnight_0_4;
        this.year = year;
        this.morning_7_12 = morning_7_12;
        this.afternoon_12_18 = afternoon_12_18;
        this.evening_18_20 = evening_18_20;
        this.category = category;
    }
}

