package org.angel.devWiki.api.controllers;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import javax.servlet.ServletException;

import org.angel.devWiki.api.model.User;
import org.angel.devWiki.api.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController {
	private static final Logger logger = Logger.getLogger(UserController.class);
	
	@Autowired
	@Qualifier("secretKey")
	private String secretKey;
	
	@Autowired
	private UserService userService;	
	
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public LoginResponse login(@RequestBody final UserLogin login) throws ServletException {
		if (login.name == null) throw new ServletException("Invalid login");
		User user = userService.getUserByUsername(login.name);
		if (user == null) throw new ServletException("Invalid login");
		return new LoginResponse(Jwts.builder().setSubject(login.name)
				.claim("roles", "user").setIssuedAt(new Date()) //TODO:created roles table and replace users with role query
				.signWith(SignatureAlgorithm.HS256, secretKey).compact());
	}

	@SuppressWarnings("unused")
	private static class UserLogin {
		public String name;
		public String password;
	}

	@SuppressWarnings("unused")
	private static class LoginResponse {
		public String token;

		public LoginResponse(final String token) {
			this.token = token;
		}
	}
}