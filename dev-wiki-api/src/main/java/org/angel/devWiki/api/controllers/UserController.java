package org.angel.devWiki.api.controllers;

import javax.servlet.ServletException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.angel.devWiki.api.exceptions.SQLInsertException;
import org.angel.devWiki.api.model.LoginResponse;
import org.angel.devWiki.api.model.User;
import org.angel.devWiki.api.service.contract.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/users")
public class UserController {
	private static final Logger logger = Logger.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;	
	
	/**
	 * Login controller
	 * @param login - credentials
	 * @return {@link LoginResponse}
	 * @throws ServletException
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST, produces = "text/plain")
	public @ResponseBody String login(@RequestBody final User login) throws ServletException {
		logger.info("login request, User:" + login);
		return userService.login(login);
	}
	
	@RequestMapping(value = "register", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON)
	public Response register(@RequestBody final User login) {
		logger.info("register request, User:" + login);
		try {
			userService.insertUser(login);
		} catch (SQLInsertException e) {
			logger.info("Return status:" + 500);
			return Response.status(500).entity(e).build();
		}
		logger.info("Return status:" + 201);
		return Response.status(201).build();
		
	}
	
	
}