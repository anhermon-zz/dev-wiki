package org.angel.devWiki.api.service;

import org.angel.devWiki.api.model.User;

public interface UserService {

	User getUserById(long id);

	User getUserByUsername(String username);

}
