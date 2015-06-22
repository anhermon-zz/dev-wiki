package org.angel.devWiki.api.service.impl;

import org.angel.devWiki.api.service.contract.EncryptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class EncryptServiceImpl implements EncryptService {

	@Autowired
	private PasswordEncoder passwordEncoder;
}
