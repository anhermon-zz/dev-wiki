package org.angel.webUtils.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.filter.GenericFilterBean;

public class CorsFilter extends GenericFilterBean {
	private static final Logger logger = Logger.getLogger(CorsFilter.class);
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException {
		logger.info("Enable cors filter");
		
		HttpServletResponse res = (HttpServletResponse) response;
		HttpServletRequest  req = (HttpServletRequest) request;
//		
//		logger.info(req.getMethod());
//		
		res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		res.addHeader("Access-Control-Allow-Credentials", "true");
		res.addHeader("Access-Control-Allow-Methods", "POST, GET, HEAD, OPTIONS");
		res.addHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
		if(req.getMethod().equals("OPTIONS")){
			logger.info("Options request detected, returning status 200");
			res.setStatus(200);
			return; //in case of options request just return a valid response
		}
		chain.doFilter(request, response); //otherwise continue fitler chain
	}

}
