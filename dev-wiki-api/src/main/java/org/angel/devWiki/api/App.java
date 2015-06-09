package org.angel.devWiki.api;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Qualifier("dev-wiki.api.config")
public class App {
	
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}
