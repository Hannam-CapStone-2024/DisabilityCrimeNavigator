//세종특별시 노인장애인 보호구역
package cap.Support;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class ApiExplorer {
    public static void main(String[] args) throws IOException {
        /*URL*/
        String urlBuilder = "http://apis.data.go.kr/5690000/sjProZone/sj_00000220" + "?" + URLEncoder.encode("serviceKey", StandardCharsets.UTF_8) + "=서비스키" + /*Service Key*/
                "&" + URLEncoder.encode("pageIndex", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("1", StandardCharsets.UTF_8) + /*페이지 번호*/
                "&" + URLEncoder.encode("pageUnit", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("20", StandardCharsets.UTF_8) + /*한 페이지 결과 수 기본20건*/
                "&" + URLEncoder.encode("dataTy", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("xml", StandardCharsets.UTF_8) + /*자료형태 : xml,json,excel/ 기본값 json*/
                "&" + URLEncoder.encode("searchCondition", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("cmptnc_Polcsttn_Nm", StandardCharsets.UTF_8) + /*값이 없는 경우 모든조건*/
                "&" + URLEncoder.encode("searchKeyword", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("세종경찰서", StandardCharsets.UTF_8); /*값이 없는 경우 검색안함*/
        URL url = new URL(urlBuilder);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb);
    }
}
