package com.example.cap.Support;

    import com.fasterxml.jackson.databind.ObjectMapper;
    import java.io.IOException;
    import java.net.HttpURLConnection;
    import java.net.URL;

    public class Main java{
        public static void main(String[] args) {
            try {
                // API 엔드포인트 URL
                URL url = new URL("http://api.odcloud.kr/api/15110478/v1/uddi:ac50edd2-7499-460d-b52b-bb3809e68503?page=1&perPage=10");

                // HTTP 연결 설정
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");

                // 응답 코드 확인
                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    // JSON 응답을 객체로 변환
                    ObjectMapper objectMapper = new ObjectMapper();
                    Response response = objectMapper.readValue(connection.getInputStream(), Response.class);

                    // 응답 처리
                    System.out.println("Total Count: " + response.getTotalCount());
                    System.out.println("Current Count: " + response.getCurrentCount());
                    // 필요한 경우 추가적인 처리 수행
                } else {
                    System.out.println("HTTP error code: " + responseCode);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    class Response {
        private int page;
        private int perPage;
        private int totalCount;
        private int currentCount;
        private int matchCount;
        private Data[] data;

        public String getTotalCount() {
        }

        public String getCurrentCount() {
        }

        // Getter와 Setter는 생략하였습니다.
    }

    class Data {
        private String 지리정보;
        private String 지형지물부호;
        private int 관리번호;
        private int 도로구간번호;
        private String 행정읍면동;
        private int 도엽번호;
        private String 설치일자;
        private String 위치구분;
        private String 턱낮추기유무;
        private String 유도블럭종류;
        private String 유도블럭연장;
        private String 유도블럭면적;
        private int 대장초기화여부;

        // Getter와 Setter는 생략하였습니다.
    }

    }
