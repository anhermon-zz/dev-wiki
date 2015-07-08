package org.angel.devWiki.api.filters;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.filter.GenericFilterBean;

public class JwtFilter extends GenericFilterBean {
	private static final Logger logger = Logger.getLogger(JwtFilter.class);
	@Autowired
	@Qualifier("secretKey")
	private String secretKey;

    @Override
    public void doFilter(final ServletRequest req,final ServletResponse res,final FilterChain chain) throws IOException, ServletException {
    	logger.info("JWT Filter");
        final HttpServletRequest request = (HttpServletRequest) req;
        final HttpServletResponse response = (HttpServletResponse) res;
        final String authHeader = request.getHeader("Authorization");        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        	//response.setStatus(403);
        	response.sendError(403);
        	//throw new ServletException("Missing or invalid Authorization header.");
        	chain.doFilter(request, response);
        	return;
        	
        }
            

        final String token = authHeader.substring(7);
        try {
            final Claims claims = Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(token).getBody();
            request.setAttribute("claims", claims);
        }catch (final SignatureException e) {
            throw new ServletException("Invalid token.");
        }
        chain.doFilter(request, response);
    }

}