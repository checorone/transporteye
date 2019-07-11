package org.ncstudy.faketransport;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

public class RequestUtil {

    private static final String resUri = "http://localhost:8085/api/v1/data";
    private static final String busUri = resUri + "/transport";
    private static final RestTemplate restTemplate = new RestTemplate();

    static String prepareAccessToken() {
        HttpHeaders headers = new HttpHeaders() {{
            setBasicAuth("fakebuses", "ncpassword");
            setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        }};
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>() {{
            add("grant_type", "password");
            add("username", "0000000000000000");
            add("password", "busadmin");
        }};
        ResponseEntity<HashMap> resp = restTemplate.postForEntity(
                "http://localhost:8901/oauth/token",
                new HttpEntity<>(map, headers),
                HashMap.class);
        return (String) resp.getBody().get("access_token");
    }

    static Transport prepareTransport(int id) {
        return restTemplate.getForObject(busUri + "/" + id, Transport.class);
    }

    static void sendTransport(Transport transport, String accessToken) {
        restTemplate.put(
                busUri,
                new HttpEntity<>(
                        transport,
                        new HttpHeaders() {{
                            setBearerAuth(accessToken);
                        }})
        );
    }
}
