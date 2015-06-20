package org.angel.devWiki.api;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.angel.devWiki.api.config.DataBaseConfig;
import org.angel.devWiki.api.filters.JwtFilter;
import org.angel.webUtils.filters.CorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.Ordered;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
@Import({DataBaseConfig.class})
@Qualifier("dev-wiki.api.config")
public class App {
	
	@Autowired
	private Environment env;
	
	@Autowired
	@Qualifier("users")
	private DataSource userDataSource; 
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		SpringApplication.run(App.class, args);
	}
	
	 @Bean
	 public FilterRegistrationBean jwtFilter() {;
	     final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
	     registrationBean.setFilter(new JwtFilter());
	     registrationBean.addUrlPatterns("/api/*");
	     registrationBean.setOrder(2);
	     
	     return registrationBean;
	  }
	 @Bean
	 public FilterRegistrationBean corsFilter() {
		 final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
	     registrationBean.setFilter(new CorsFilter());
	     registrationBean.addUrlPatterns("/*");
	     registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);

	     return registrationBean;
	  }
	 @Bean
	 @Qualifier("users")
	 public JdbcTemplate jdbcTemplate() {
		return new JdbcTemplate(userDataSource);
	 }
	 @Bean
	 @Qualifier("secretKey")
	 public String secretKey() {
		 return String.valueOf(UUID.randomUUID());
	 }
	 
	
//	@Bean
//	public OncePerRequestFilter validationFilter(){
//		return new JWTAuthFilter();
//	}

}
