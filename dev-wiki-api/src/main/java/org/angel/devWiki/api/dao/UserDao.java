package org.angel.devWiki.api.dao;

import org.angel.devWiki.api.model.User;


public interface UserDao {

	User getUserById(long id);

	User getUserByUsername(String username);
		
}
