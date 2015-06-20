package org.angel.devWiki.api.service;

import org.angel.devWiki.api.dao.UserDao;
import org.angel.devWiki.api.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao dao;
	
	@Override
	public User getUserById(long id) {
		return dao.getUserById(id);
	}
	@Override
	public User getUserByUsername(String username) {
		return dao.getUserByUsername(username);
	}
}
