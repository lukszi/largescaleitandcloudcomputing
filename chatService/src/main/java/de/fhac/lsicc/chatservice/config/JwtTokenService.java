package de.fhac.lsicc.chatservice.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.attribute.UserPrincipal;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
@Component("tokenService")
public class JwtTokenService
{
    private final URL authServerUrl;
    
    @Autowired
    public JwtTokenService(URL authServerUrl)
    {
        this.authServerUrl = authServerUrl;
    }
    
    public UserPrincipal parseToken(String token) throws IOException
    {
        String jsonToken = validateToken(token);
        return this.createTokenDetailsObject(jsonToken);
    }
    
    private String validateToken(String token) throws IOException
    {
        HttpURLConnection con = (HttpURLConnection) this.authServerUrl.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Authorization", "Bearer " + token);
        int status = con.getResponseCode();
        if (status == HttpURLConnection.HTTP_UNAUTHORIZED)
        {
            throw new IOException("Unauthorized");
        }
        else if (status == HttpURLConnection.HTTP_OK)
        {
            return new BufferedReader(
                    new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.joining("\n"));
        }
        else {
            throw new IOException("Unknown error");
        }
    }
    
    private TokenDetails createTokenDetailsObject(String jsonToken){
        ObjectMapper mapper = new ObjectMapper();
        try{
            return mapper.readValue(jsonToken, TokenDetails.class);
        } catch (JsonProcessingException e)
        {
            throw new RuntimeException(e);
        }
    }
    
    public record TokenDetails(long uid, String iss, long iat, long exp) implements UserPrincipal
        {
    
            @Override
            public boolean equals(Object another)
            {
                if (!(another instanceof TokenDetails))
                    return false;
                return ((TokenDetails) another).uid == this.uid;
            }
    
            @Override
            public String toString()
            {
                return "";
            }
    
            @Override
            public int hashCode()
            {
                return Objects.hash(uid, iat, exp);
            }
    
            @Override
            public String getName()
            {
                return iss;
            }
        }
}
