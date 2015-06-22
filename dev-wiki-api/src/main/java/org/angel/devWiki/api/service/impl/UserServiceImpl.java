package org.angel.devWiki.api.service.impl;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.angel.devWiki.api.dao.contract.UserDao;
import org.angel.devWiki.api.exceptions.SQLInsertException;
import org.angel.devWiki.api.model.LoginResponse;
import org.angel.devWiki.api.model.User;
import org.angel.devWiki.api.service.contract.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

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
	public LoginResponse login(User login) throws ServletException {
		if (login.getUsername() == null || login.getPassword() == null) throw new ServletException("Invalid login");
		User user = getUserByUsername(login.getUsername());
		if (user == null) throw new ServletException("Invalid login, username is null!");
		if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) throw new ServletException("Invalid login, password does not match!");
		Map<String, String> claims = new HashMap<>();
		claims.put("role", "user"); //TODO:set real roles
		claims.put("username", user.getUsername());
		claims.put("email", user.getEmail());
		return new LoginResponse(Jwts.builder().setSubject(user.getUsername())
				.claim("roles", "user").setIssuedAt(new Date()) //TODO:created roles table and replace users with role query
				.signWith(SignatureAlgorithm.HS256, secretKey).compact(), claims );
	}
}
