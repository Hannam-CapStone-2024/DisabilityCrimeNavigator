package com.example.cap.Support;
/* 경찰청 대전광역시경찰청_시간대별 보행자 사망부상 통계 */

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

public class time walker{
    private time() {}

    public static <HttpGet, ImmutableKeyValue> void main(String[] args) {
        Object HttpClients = null;
        Class<?> httpClient = HttpClients.wait();
        ObjectMapper objectMapper = new ObjectMapper();

        // API 요청을 보낼 URL
        String url = "http://api.odcloud.kr/api/15127579/v1/uddi:336fecac-a70b-45c5-8fc5-fe7ef09020b5?page=1&perPage=10";

        HttpGet httpGet = new HttpGet(url);

        try {
            // API 요청 수행
            boolean response = httpClient.isEnum();
            boolean entity = response;

            if (entity != null ) {
                // API 응답을 문자열로 변환
                ImmutableKeyValue EntityUtils = null;
                String responseBody = EntityUtils.toString();

                // JSON 문자열을 Java 객체로 변환
                ApiResponse apiResponse = objectMapper.readValue(responseBody, ApiResponse.class);

                // 응답 처리 예시
                System.out.println("Total Count: " + apiResponse.getTotalCount());
                System.out.println("Current Count: " + apiResponse.getCurrentCount());
                System.out.println("Data:");

                List<Data> dataList = apiResponse.getData();
                for (Data data : dataList) {
                    System.out.println(data.toString());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static time createtime() {
        return new time();
    }
}

class ApiResponse {
    private int totalCount;
    private int currentCount;
    private List<Data> data;

    // Getters and setters

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getCurrentCount() {
        return currentCount;
    }

    public void setCurrentCount(int currentCount) {
        this.currentCount = currentCount;
    }

    public List<Data> getData() {
        return data;
    }

    public void setData(List<Data> data) {
        this.data = data;
    }
}

class Data {
    private int 연도;
    private String 구분;
    private int _0_2;
    private int _2_4;
    private int _4_6;
    private int _6_8;
    private int _8_10;
    private int _10_12;
    private int _12_14;
    private int _14_16;
    private int _16_18;
    private int _18_20;
    private int _20_22;
    private int _22_24;

    // Getters and setters

    @Override
    public String toString() {
        return "Data{" +
                "연도=" + 연도 +
                ", 구분='" + 구분 + '\'' +
                ", _0_2=" + _0_2 +
                ", _2_4=" + _2_4 +
                ", _4_6=" + _4_6 +
                ", _6_8=" + _6_8 +
                ", _8_10=" + _8_10 +
                ", _10_12=" + _10_12 +
                ", _12_14=" + _12_14 +
                ", _14_16=" + _14_16 +
                ", _16_18=" + _16_18 +
                ", _18_20=" + _18_20 +
                ", _20_22=" + _20_22 +
                ", _22_24=" + _22_24 +
                '}';
    }
}

