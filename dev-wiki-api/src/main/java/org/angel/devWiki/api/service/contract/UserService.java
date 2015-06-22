package org.angel.devWiki.api.service.contract;

import javax.servlet.ServletException;

import org.angel.devWiki.api.exceptions.SQLInsertException;
import org.angel.devWiki.api.model.LoginResponse;
import org.angel.devWiki.api.model.User;

public interface UserService {

	User getUserById(long id);

	User getUserByUsername(String username);

	LoginResponse login(User login) throws ServletException;

	void insertUser(User user) throws SQLInsertException;

}
