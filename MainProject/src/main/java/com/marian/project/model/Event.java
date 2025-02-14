package com.marian.project.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eventid")
    private Long eventid;; // Primary Key

    private String title;
    private String department;
    private String description;
    @Lob
    private String fullDescription;
    @Lob
    private String guidelines;
    @Lob
    private String image1; 
    @Lob
    private String image2; // Image field 2
    @Lob
    private String image3; 
    @Lob // Image field 3
    private String image4; // Image field 4
    private String date;
    private String time;
    private String location;

    private int seats;

	public Event() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Event(Long id, String title, String department, String description, String fullDescription,
			String guidelines, String image1, String image2, String image3, String image4, String date, String time,
			String location, int seats) {
		super();
		this.eventid = id;
		this.title = title;
		this.department = department;
		this.description = description;
		this.fullDescription = fullDescription;
		this.guidelines = guidelines;
		this.image1 = image1;
		this.image2 = image2;
		this.image3 = image3;
		this.image4 = image4;
		this.date = date;
		this.time = time;
		this.location = location;
		this.seats = seats;
	}

	public Long getId() {
		return eventid;
	}

	public void setId(Long id) {
		this.eventid = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFullDescription() {
		return fullDescription;
	}

	public void setFullDescription(String fullDescription) {
		this.fullDescription = fullDescription;
	}

	public String getGuidelines() {
		return guidelines;
	}

	public void setGuidelines(String guidelines) {
		this.guidelines = guidelines;
	}

	public String getImage1() {
		return image1;
	}

	public void setImage1(String image1) {
		this.image1 = image1;
	}

	public String getImage2() {
		return image2;
	}

	public void setImage2(String image2) {
		this.image2 = image2;
	}

	public String getImage3() {
		return image3;
	}

	public void setImage3(String image3) {
		this.image3 = image3;
	}

	public String getImage4() {
		return image4;
	}

	public void setImage4(String image4) {
		this.image4 = image4;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public int getSeats() {
		return seats;
	}

	public void setSeats(int seats) {
		this.seats = seats;
	}

	@Override
	public String toString() {
		return "Event [id=" + eventid + ", title=" + title + ", department=" + department + ", description=" + description
				+ ", fullDescription=" + fullDescription + ", guidelines=" + guidelines + ", image1=" + image1
				+ ", image2=" + image2 + ", image3=" + image3 + ", image4=" + image4 + ", date=" + date + ", time="
				+ time + ", location=" + location + ", seats=" + seats + "]";
	}
}


	