package com.example.cap.Support;
/*요일별 범죄*/

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class day {

    // RestTemplate을 사용하여 API 요청을 보낼 클라이언트를 생성
    private final RestTemplate restTemplate = new RestTemplate();

    // API 요청을 보낼 기본 URL
    private final String baseUrl = "https://api.odcloud.kr/api";

    // CrimeStatisticsResponse를 반환하는 메서드
    public ResponseEntity<CrimeStatisticsResponse> getCrimeStatistics(String path, int page, int perPage, String returnType) {
        // API 요청 URL 생성
        String url = baseUrl + path + "?page=" + page + "&perPage=" + perPage + "&returnType=" + returnType;

        // API 요청 및 응답 처리
        ResponseEntity<CrimeStatisticsResponse> response = restTemplate.getForEntity(url, CrimeStatisticsResponse.class);

        return response;
    }

    // API 응답 모델 클래스
    public static class CrimeStatisticsResponse {
        private int page;
        private int perPage;
        private int totalCount;
        private int currentCount;
        private int matchCount;
        private List<CrimeData> data;

        // Getter 및 Setter 메서드
        // JSON 속성과 매핑하기 위해 @JsonProperty 어노테이션 사용
        @JsonProperty("page")
        public int getPage() {
            return page;
        }

        public void setPage(int page) {
            this.page = page;
        }

        @JsonProperty("perPage")
        public int getPerPage() {
            return perPage;
        }

        public void setPerPage(int perPage) {
            this.perPage = perPage;
        }

        @JsonProperty("totalCount")
        public int getTotalCount() {
            return totalCount;
        }

        public void setTotalCount(int totalCount) {
            this.totalCount = totalCount;
        }

        @JsonProperty("currentCount")
        public int getCurrentCount() {
            return currentCount;
        }

        public void setCurrentCount(int currentCount) {
            this.currentCount = currentCount;
        }

        @JsonProperty("matchCount")
        public int getMatchCount() {
            return matchCount;
        }

        public void setMatchCount(int matchCount) {
            this.matchCount = matchCount;
        }

        @JsonProperty("data")
        public List<CrimeData> getData() {
            return data;
        }

        public void setData(List<CrimeData> data) {
            this.data = data;
        }
    }

    // 범죄 데이터 모델 클래스
    public static class CrimeData {
        private int year;
        private String item;
        private int day;
        private int month;
        private int tuesday;
        private int wednesday;
        private int thursday;
        private int friday;
        private int saturday;

        // Getter 및 Setter 메서드
        // JSON 속성과 매핑하기 위해 @JsonProperty 어노테이션 사용
        @JsonProperty("연도")
        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        @JsonProperty("항목")
        public String getItem() {
            return item;
        }

        public void setItem(String item) {
            this.item = item;
        }

        @JsonProperty("일")
        public int getDay() {
            return day;
        }

        public void setDay(int day) {
            this.day = day;
        }

        @JsonProperty("월")
        public int getMonth() {
            return month;
        }

        public void setMonth(int month) {
            this.month = month;
        }

        @JsonProperty("화")
        public int getTuesday() {
            return tuesday;
        }

        public void setTuesday(int tuesday) {
            this.tuesday = tuesday;
        }

        @JsonProperty("수")
        public int getWednesday() {
            return wednesday;
        }

        public void setWednesday(int wednesday) {
            this.wednesday = wednesday;
        }

        @JsonProperty("목")
        public int getThursday() {
            return thursday;
        }

        public void setThursday(int thursday) {
            this.thursday = thursday;
        }

        @JsonProperty("금")
        public int getFriday() {
            return friday;
        }

        public void setFriday(int friday) {
            this.friday = friday;
        }

        @JsonProperty("토")
        public int getSaturday() {
            return saturday;
        }

        public void setSaturday(int saturday) {
            this.saturday = saturday;
        }
    }
}
