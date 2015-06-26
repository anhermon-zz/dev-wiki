package org.angel.devWiki.api.dao.contract;

import org.angel.devWiki.api.exceptions.SQLInsertException;
import org.angel.devWiki.api.model.User;


public interface UserDao {

	User getUserById(long id);

	User getUserByUsername(String username);

	void insertUser(User user) throws SQLInsertException;
		
}
