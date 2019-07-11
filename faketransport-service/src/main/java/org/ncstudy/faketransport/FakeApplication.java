package org.ncstudy.faketransport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FakeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FakeApplication.class, args);
    }

    @Bean
    public Activators activatorsBean() {
        return new Activators();
    }

}
