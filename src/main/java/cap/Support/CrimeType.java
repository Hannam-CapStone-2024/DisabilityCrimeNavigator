package cap.Support;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum CrimeType {
    Robbery("Robbery"), //강도
    Murder("Murder"), //살인
    Sexual_Violence("Sexual_Violence"), //성폭력
    Violence("Violence"), //폭력
    Etc("Etc"), //기타형법
    Moral("Moral"), //풍속범
    Intelli("Intelli"), //지능범
    Violent("Violent"), //강력범
    Theft("Theft"), //절도범
    Special("Special"),
    None("None");
//특별범법
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
        return CrimeType.None;
    }
}