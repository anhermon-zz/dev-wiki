package org.angel.devWiki.api.exceptions;

/**
 * Thrown when SQL insert operation fails
 * @author Angel Hermon
 *
 */
public class SQLInsertException extends Exception {
	private static final long serialVersionUID = 1936933722285981194L;
	
	public SQLInsertException(Exception e) {
		this.initCause(e);
	}


}
