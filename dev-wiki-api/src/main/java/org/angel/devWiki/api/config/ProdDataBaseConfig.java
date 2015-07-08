package org.angel.devWiki.api.config;

import java.util.Properties;

import javax.annotation.Resource;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
//@Profile("production")
@PropertySource({"classpath:config/db.properties","classpath:config/hibernate.properties"})
public class ProdDataBaseConfig {
	 
	 private static final String PROPERTY_NAME_USER_DATABASE_DRIVER   = "user.db.driver";
	 private static final String PROPERTY_NAME_USER_DATABASE_PASSWORD = "user.db.password";
	 private static final String PROPERTY_NAME_USER_DATABASE_URL      = "user.db.url";
	 private static final String PROPERTY_NAME_USER_DATABASE_USERNAME = "user.db.username";
	
	private static final String PROPERTY_HBM2DLL = "hibernate.hbm2ddl.auto";
	private static final String PROPERTY_HIBERNATE_DIALECT = "hibernate.dialect";
	
	@Resource
	private Environment env;
	
	@Bean
	@Qualifier("users")
    public DataSource devWikiDBDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
              
		dataSource.setDriverClassName(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_DRIVER));
		dataSource.setUrl(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_URL));
		dataSource.setUsername(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_USERNAME));
		dataSource.setPassword(env.getRequiredProperty(PROPERTY_NAME_USER_DATABASE_PASSWORD));
              
		return dataSource;
     }
	
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(devWikiDBDataSource());

		JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdapter);
		em.setPackagesToScan("org.angel.devWiki.api.model");//note that hibernate is too dumb to find entities on its own, package needs to be specified
		em.setJpaProperties(additionalProperties());

		return em;
	}

	@Bean
	public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(emf);

		return transactionManager;
	}

	@Bean
	public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}

	private Properties additionalProperties() {
		Properties properties = new Properties();
		properties.setProperty("hibernate.hbm2ddl.auto", env.getProperty(PROPERTY_HBM2DLL));
		properties.setProperty("hibernate.dialect", env.getProperty(PROPERTY_HIBERNATE_DIALECT));
		return properties;
	}
	 
}
