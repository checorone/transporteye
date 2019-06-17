package org.ncstudy.transportservice.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers(HttpMethod.DELETE, "api/v1/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "api/v1/**").authenticated()
                .antMatchers(HttpMethod.PUT, "api/v1/**").authenticated()
                .antMatchers("test/**").authenticated()
                .anyRequest().permitAll();
    }
}
