package org.angel.devWiki.api;

import java.io.UnsupportedEncodingException;

import org.angel.devWiki.api.filters.JWTAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.filter.OncePerRequestFilter;

@SpringBootApplication
@Qualifier("dev-wiki.api.config")
@PropertySource("classpath:security/keys.properties")
public class App {
	
	@Autowired
	private Environment env;
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		SpringApplication.run(App.class, args);
	}
	
	@Bean
	public OncePerRequestFilter validationFilter(){
		return new JWTAuthFilter();
	}

}
