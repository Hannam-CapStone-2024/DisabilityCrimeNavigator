package com.example.cap.Support;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpClientExample {
    public static void main(String[] args) {
        HttpURLConnection connection = null;
        BufferedReader reader = null;

        try {
            // API 엔드포인트 URL
            URL url = new URL("https://api.example.com/data");

            // HTTP 연결 설정
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // 응답 코드 확인
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // 응답 데이터 읽기
                reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                System.out.println("Response: " + response.toString());
            } else {
                System.out.println("HTTP error code: " + responseCode);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 연결 및 리더 닫기
            if (connection != null) {
                connection.disconnect();
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
