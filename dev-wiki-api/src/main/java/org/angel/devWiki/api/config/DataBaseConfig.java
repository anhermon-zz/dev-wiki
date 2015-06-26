package org.angel.devWiki.api.config;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@PropertySource("classpath:config/db.properties")
public class DataBaseConfig {
	 
	 private static final String PROPERTY_NAME_USER_DATABASE_DRIVER   = "user.db.driver";
	 private static final String PROPERTY_NAME_USER_DATABASE_PASSWORD = "user.db.password";
	 private static final String PROPERTY_NAME_USER_DATABASE_URL      = "user.db.url";
	 private static final String PROPERTY_NAME_USER_DATABASE_USERNAME = "user.db.username";
	
	@Resource
	private Environment env;
	
	@Bean
	@Qualifier("users")
    public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
              
		dataSource.setDriverClassName(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_DRIVER));
		dataSource.setUrl(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_URL));
		dataSource.setUsername(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_USERNAME));
		dataSource.setPassword(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_PASSWORD));
              
		return dataSource;
     }
	 
}
