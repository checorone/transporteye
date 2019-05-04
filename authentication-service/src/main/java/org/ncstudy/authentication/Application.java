package org.ncstudy.authentication;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableResourceServer
@EnableAuthorizationServer
public class Application {
	private static final Logger logger = LoggerFactory.getLogger(Application.class);
	
    @RequestMapping("/user")
    public Principal user(Principal user) {
       logger.info("AS /user has been called");
       logger.debug("user info: "+user.toString());
       return user;
    }
    
    

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


}
