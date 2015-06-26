package org.angel.devWiki.api.model;

import java.util.List;

public class Record {

	private int id;
	private String title;
	private String content;
	private Record parent;
	private List<Record> children;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Record getParent() {
		return parent;
	}
	public void setParent(Record parent) {
		this.parent = parent;
	}
	public List<Record> getChildren() {
		return children;
	}
	public void setChildren(List<Record> children) {
		this.children = children;
	}
}
