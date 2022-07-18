package de.fhac.lsicc.chatservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNullApi;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.attribute.UserPrincipal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lukas Szimtenings on 7/17/2022.
 */
@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    private final JwtTokenService tokenService;
    
    public JwtAuthenticationFilter(JwtTokenService tokenService) {
        this.tokenService = tokenService;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws IOException, ServletException
    {
        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        
        if (authorizationHeaderIsInvalid(authorizationHeader)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        
        UsernamePasswordAuthenticationToken token = createToken(authorizationHeader);
        
        SecurityContextHolder.getContext().setAuthentication(token);
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
    
    private boolean authorizationHeaderIsInvalid(String authorizationHeader) {
        return authorizationHeader == null
                || !authorizationHeader.startsWith("Bearer ");
    }
    
    private UsernamePasswordAuthenticationToken createToken(String authorizationHeader) throws IOException
    {
        String token = authorizationHeader.replace("Bearer ", "");
        UserPrincipal userPrincipal = tokenService.parseToken(token);
        
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        return new UsernamePasswordAuthenticationToken(userPrincipal, null, authorities);
    }
}