package de.fhac.lsicc.chatservice.controller;

import de.fhac.lsicc.chatservice.config.JwtTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

/**
 * Created by Lukas Szimtenings on 7/18/2022.
 */
@Controller
public class HelloWorldController
{
    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld(Principal principal){
        JwtTokenService.TokenDetails underlyingPrincipal = (JwtTokenService.TokenDetails) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        return ResponseEntity.ok("Hello " + principal.getName());
    }
}
