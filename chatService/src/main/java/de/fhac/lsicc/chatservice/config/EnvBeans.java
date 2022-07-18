package de.fhac.lsicc.chatservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
@Configuration
public class EnvBeans
{
    @Value("${AUTHENTICATION_SERVER}")
    private String authServerUrlString;
   
    @Bean
    public URL getAuthServerUrl() throws MalformedURLException
    {
        return new URL(this.authServerUrlString);
    }
}
