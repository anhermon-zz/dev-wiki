package org.angel.devWiki.api.dao;

import javax.annotation.Resource;

import org.angel.devWiki.api.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:db/queries.properties")
public class UserDaoImpl implements UserDao {
	
	private static final String GET_USER_BY_ID_QUERY = "user.query.byId";
	private static final String GET_USER_BY_USERNAME_QUERY = "user.query.byUser";
	
	@Autowired
	@Qualifier("users")
	private JdbcTemplate jdbcTemplate;
		
	@Resource
	private Environment env;
	
	@Override
	public User getUserById(long id){
		try {
			return jdbcTemplate.queryForObject(env.getProperty(GET_USER_BY_ID_QUERY), new Object[] {id},User.getMapper());
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
	@Override
	public User getUserByUsername(String username){
		try {
			return jdbcTemplate.queryForObject(env.getProperty(GET_USER_BY_USERNAME_QUERY), new Object[] {username},User.getMapper());
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
}
