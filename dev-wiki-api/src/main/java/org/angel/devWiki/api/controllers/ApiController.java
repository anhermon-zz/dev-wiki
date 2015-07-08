package org.angel.devWiki.api.controllers;

import io.jsonwebtoken.Claims;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {	
	
	@SuppressWarnings("rawtypes")
	@RequestMapping(method = RequestMethod.OPTIONS, value = "roles**")
	@ResponseBody
	public ResponseEntity handleOptions() {
		System.out.println("flag");
	    return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "role/{role}", method = RequestMethod.GET)
	public Boolean login(@PathVariable final String role,
			final HttpServletRequest request) throws ServletException {
		final Claims claims = (Claims) request.getAttribute("claims");
		return claims != null ? ((List<String>) claims.get("roles")).contains(role) : false;
	}
}