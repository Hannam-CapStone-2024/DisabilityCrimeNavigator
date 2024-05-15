package cap.Support;
/* 경찰청 대전광역시경찰청_대전지역 시간대별 범죄 발생 현황 */

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CrimeStatisticsResponse {

    private String swagger;
    private Info info;
    private String host;
    private String basePath;
    private List<String> schemes;
    private SecurityDefinitions securityDefinitions;
    private Paths paths;
    private Definitions definitions;

    // Getters and Setters
}

class Info {
    private String version;
    private String title;
    private String description;

    // Getters and Setters
}

class SecurityDefinitions {
    @JsonProperty("ApiKeyAuth")
    private ApiKeyAuth apiKeyAuth;

    @JsonProperty("ApiKeyAuth2")
    private ApiKeyAuth apiKeyAuth2;

    // Getters and Setters
}

class ApiKeyAuth {
    private String type;
    private String in;
    private String name;

    // Getters and Setters
}

class Paths {
    @JsonProperty("/15094058/v1/uddi:722fc7bd-86d1-4ec4-8b9a-ef4350ebac28")
    private Path path1;

    @JsonProperty("/15094058/v1/uddi:a144c4e8-a41d-45e9-bd94-d90a675b3dec")
    private Path path2;

    // Getters and Setters
}

class Path {
    private Get get;

    // Getters and Setters
}

class Get {
    private List<String> tags;
    private String summary;
    private String operationId;
    private String description;
    private List<String> consumes;
    private List<String> produces;
    private List<Parameter> parameters;
    private Responses responses;
    private List<Security> security;

    // Getters and Setters
}

class Parameter {
    private String name;
    private String in;
    private String description;
    private String type;
    private String format;
    private boolean exclusiveMinimum;
    private int _default;

    // Getters and Setters
}

class Responses {
    // Define your response schemas here
}

class Security {
    // Define your security definitions here
}

class Definitions {
    // Define your data model here
}