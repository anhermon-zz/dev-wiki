package org.angel.devWiki.api.model;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User implements Serializable{
	private static final long serialVersionUID = -5961461077159730582L;
	
	private long id = 0;
	private boolean activated = false;
	
	private String username;
	private String password;
	private String email;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public boolean isActivated() {
		return activated;
	}
	public void setActivated(boolean activated) {
		this.activated = activated;
	}
	public static final RowMapper<User> getMapper(){
		return new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				User user = new User();
				user.id = rs.getLong("id");
				user.username = rs.getString("username");
				user.password = rs.getString("password");
				user.email    = rs.getString("email");
				user.activated = rs.getBoolean("activated");
				return user;
			}
		};
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", activated=" + activated + ", username="
				+ username + ", password=" + password + ", email=" + email + "]";
	}

}
