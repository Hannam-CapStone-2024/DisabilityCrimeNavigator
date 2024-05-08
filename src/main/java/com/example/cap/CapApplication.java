package com.example.cap;

import com.example.cap.Map.MapController;
import com.example.cap.Support.CrimeZoneController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CapApplication {

    static String key = "https://api.odcloud.kr/api/15014357/v1/uddi:1de84e36-fda0-4396-8de6-a73d000849c9?page=1&perPage=10&serviceKey=1Sn0o0so2SkZMr8X7Rnzhw7jOEf7JcIVseZU%2FFgWkwpdUWIwBPWV9VtC3YLCOqDYa%2F3hCkLoTOxChspnuJRCug%3D%3D";

    public static void main(String[] args) {

        SpringApplication.run(CapApplication.class, args);

        System.out.println("API 키: " + MapController.AllowURL(key));

        System.out.println("범죄 : " + CrimeZoneController.GetInstance().GetCrimeZones());
    }

}
