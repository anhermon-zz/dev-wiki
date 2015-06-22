package org.angel.devWiki.api.model;

import java.util.Map;

public class LoginResponse {
	private String token;
	private Map<String, String> claims;
	
	public LoginResponse(final String token, Map<String, String> claims) {
		this.token = token;
		this.claims = claims;
	}
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}

	public Map<String, String> getClaims() {
		return claims;
	}

	public void setClaims(Map<String, String> claims) {
		this.claims = claims;
	}
}
