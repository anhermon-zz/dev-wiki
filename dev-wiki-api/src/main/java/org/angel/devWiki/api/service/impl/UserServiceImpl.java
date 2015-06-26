package org.angel.devWiki.api.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;

import org.angel.devWiki.api.dao.contract.UserDao;
import org.angel.devWiki.api.exceptions.SQLInsertException;
import org.angel.devWiki.api.model.User;
import org.angel.devWiki.api.service.contract.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	private static final Logger logger = Logger.getLogger(UserServiceImpl.class);
	/**
	 * Randomly genereted secret key
	 */
	@Autowired
	@Qualifier("secretKey")
	private String secretKey;
	
	@Autowired
	private UserDao dao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public User getUserById(long id) {
		return dao.getUserById(id);
	}
	@Override
	public User getUserByUsername(String username) {
		return dao.getUserByUsername(username);
	}
	
	@Override
	public void insertUser(User user) throws SQLInsertException {
		dao.insertUser(user);
	}
	@Override
	public String login(User login) throws ServletException {
		logger.info("login request: " + login);
		if (login.getUsername() == null || login.getPassword() == null) throw new ServletException("Invalid login");
		User user = getUserByUsername(login.getUsername());
		logger.info("User from DB:" + user);
		if (user == null) throw new ServletException("Invalid login, username is null!");
		if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) throw new ServletException("Invalid login, password does not match!");
		
		Claims claims = Jwts.claims().setExpiration(expirationDate())
									 .setIssuedAt(new Date());
		claims.put("role", "user");
		claims.put("username", user.getUsername());
		claims.put("email", user.getEmail());
		return Jwts.builder().setSubject(user.getUsername())
				      .setClaims(claims)//TODO:created roles table and replace users with role query
				      .signWith(SignatureAlgorithm.HS256, secretKey)
				      .compact();
	}
	private Date expirationDate() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.DATE, 1);
		return cal.getTime();
	}
}
