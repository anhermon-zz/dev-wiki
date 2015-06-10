package org.angel.devWiki.api.filters;

import io.jsonwebtoken.SignatureAlgorithm;

import java.io.IOException;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWTVerifier;

/**
 * Token validation filter
 * @author Angel Hermon
 *
 */
public class JWTAuthFilter extends OncePerRequestFilter {
	private static final Logger logger = Logger.getLogger(JWTAuthFilter.class);
	private static final SignatureAlgorithm alg = SignatureAlgorithm.RS512;
	
	private JWTVerifier jwtVerifier;
	
	@Autowired
	private Environment env;
	
	@Override
	protected void initFilterBean() throws ServletException {
		 jwtVerifier = new JWTVerifier(Base64.decodeBase64(env.getProperty("secret.key")),"123"); //TODO:figure out what is Client ID, and how should oe be generated
	}
	@Override
	protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String token = getToken((HttpServletRequest) request);
        try {
            Map<String, Object> decoded = jwtVerifier.verify(token);
        } catch (Exception e) {
            logger.warn("Unauthorized: Token validation failed");
            response.sendError(401); //Blocks unauthorized access
        }
        filterChain.doFilter(request, response);
	}

	 /**
	  * Fetch token from request headers
	  * @param httpRequest - incoming HTTP Request
	  * @return jwt token
	  * @throws ServletException
	  */
	 private String getToken(HttpServletRequest httpRequest) throws ServletException {
	    	String token = null;
	        final String authorizationHeader = httpRequest.getHeader("authorization");
	        if (authorizationHeader == null){
	            logger.warn("Unauthorized: No Authorization header was found");
	            return null;
	        }
	        String[] parts = authorizationHeader.split(" ");
	        if (parts.length != 2)
	            logger.warn("Unauthorized: Format is Authorization: Bearer [token]");
	        String scheme = parts[0];
	        String credentials = parts[1];
	        Pattern pattern = Pattern.compile("^Bearer$", Pattern.CASE_INSENSITIVE);
	        if (pattern.matcher(scheme).matches())
	            token = credentials;
	        return token;
	    }
	
	 @Override
	 public void destroy() {}
}
