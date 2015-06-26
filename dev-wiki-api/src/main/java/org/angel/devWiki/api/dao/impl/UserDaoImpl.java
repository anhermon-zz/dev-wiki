package org.angel.devWiki.api.dao.impl;

import javax.annotation.Resource;

import org.angel.devWiki.api.dao.contract.UserDao;
import org.angel.devWiki.api.exceptions.InvalidUserException;
import org.angel.devWiki.api.exceptions.SQLInsertException;
import org.angel.devWiki.api.model.User;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:db/queries.properties")
public class UserDaoImpl implements UserDao {
	private static final Logger logger = Logger.getLogger(UserDaoImpl.class);
	private static final String GET_USER_BY_ID_QUERY = "user.query.byId";
	private static final String GET_USER_BY_USERNAME_QUERY = "user.query.byUser";
	private static final String INSERT_USER= "user.insert";
	
	@Autowired
	@Qualifier("users")
	private JdbcTemplate jdbcTemplate;
		
	@Resource
	private Environment env;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public User getUserById(long id) {
		try {
			return jdbcTemplate.queryForObject(env.getProperty(GET_USER_BY_ID_QUERY), new Object[] {id},User.getMapper());
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
	@Override
	public User getUserByUsername(String username) {
		try {
			return jdbcTemplate.queryForObject(env.getProperty(GET_USER_BY_USERNAME_QUERY), new Object[] {username},User.getMapper());
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
	@Override
	public void insertUser(User user) throws SQLInsertException{
		try {
			if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) throw new InvalidUserException();
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			jdbcTemplate.update(env.getProperty(INSERT_USER), new Object[] {user.getUsername(), user.getPassword(), user.getPassword()});
		} catch (Exception e) {
			logger.error(e);
			throw new SQLInsertException(e);
		}
	}
	
}
