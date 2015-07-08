package org.angel.devWiki.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Resource extends DataEntity{

	@Column(name = "url", length = 150, unique = true)
	private String url;

	@Override
	public String toString() {
		return "Resource [url=" + url + ", id=" + getId()
				+ ", title=" + getTitle() + ", author=" + getAuthor()
				+ ", crationDate=" + getCrationDate() + "]";
	}
}
