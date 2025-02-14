package com.marian.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-generate the notid
    private Long notid;

    private String type;
    private String title;
    private String message;
    private String icon;

    // Default constructor
    public Notification() {
    }

	public Notification(Long notid, String type, String title, String message, String icon) {
		super();
		this.notid = notid;
		this.type = type;
		this.title = title;
		this.message = message;
		this.icon = icon;
	}

	public Long getNotid() {
		return notid;
	}

	public void setNotid(Long notid) {
		this.notid = notid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	@Override
	public String toString() {
		return "Notification [notid=" + notid + ", type=" + type + ", title=" + title + ", message=" + message
				+ ", icon=" + icon + "]";
	}

   
}
