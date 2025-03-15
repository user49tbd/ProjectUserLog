package com.securityTestPract.securityTestPract.DTO;

public class session {
	private String token;
	private Long timer;
	public session(){
		
	}
	public session(String token, Long timer) {
		super();
		this.token = token;
		this.timer = timer;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Long getTimer() {
		return timer;
	}
	public void setTimer(Long timer) {
		this.timer = timer;
	}
	
}
