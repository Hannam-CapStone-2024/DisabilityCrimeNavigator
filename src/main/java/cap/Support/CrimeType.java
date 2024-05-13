package cap.Support;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum CrimeType {
    Robbery("Robbery"),
    Murder("Murder"),
    Sexual_Violence("Sexual_Violence"),
    Violence("Violence");

    private String value;

    CrimeType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static CrimeType fromValue(String value) {
        for (CrimeType type : values()) {
            if (type.value.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid CrimeType value: " + value);
    }
}