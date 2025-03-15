package com.securityTestPract.securityTestPract.Model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name="userEntity")
public class userEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="name", nullable=false, unique=true)
	private String name;
	@Column(name="password")
	private String password;
	
	@ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@JoinTable(
	        name = "user_roles",
	        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
	        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
	    )
	private List<roleEntity> roles = new ArrayList<>();
	
	public userEntity() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<roleEntity> getRoles() {
		return roles;
	}

	public void setRoles(List<roleEntity> roles) {
		this.roles = roles;
	}
	
	
	
}
