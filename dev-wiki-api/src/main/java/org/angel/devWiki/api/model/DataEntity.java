package org.angel.devWiki.api.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="ENTITY_TYPE", discriminatorType = DiscriminatorType.INTEGER)
@Table(name = "data_entity")
public abstract class DataEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)// Default value is AUTO
	@Column(name = "id")
	private int id;
	
	@Column(name = "title", nullable=false, length = 100, unique=true)
	private String title;
	
	@Column(name = "author", nullable=false, length = 70, unique=false)
	private String author;
	
	@Column(name = "cration_date", nullable=false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date crationDate;

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

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getCrationDate() {
		return crationDate;
	}

	public void setCrationDate(Date crationDate) {
		this.crationDate = crationDate;
	}
}
