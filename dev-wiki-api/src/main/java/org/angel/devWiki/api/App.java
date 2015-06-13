package org.angel.devWiki.api;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@SpringBootApplication
@Qualifier("dev-wiki.api.config")
@PropertySource("classpath:security/keys.properties")
public class App {
	
	@Autowired
	private Environment env;
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		SpringApplication.run(App.class, args);
	}
	public String newFeature(){
		return "new Feature";
	}
	
//	@Bean
//	public OncePerRequestFilter validationFilter(){
//		return new JWTAuthFilter();
//	}

}
