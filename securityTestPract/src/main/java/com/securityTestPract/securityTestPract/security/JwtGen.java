package com.securityTestPract.securityTestPract.security;

import java.util.Date;
import java.util.List;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@Component
public class JwtGen {
	public String generateToken() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String usrName = auth.getName();
		Date dt = new Date();
		Date expiredt = new Date(dt.getTime()+securityConstants.JwtTime);
		String token = Jwts.builder().setSubject(usrName)
				.setIssuedAt(new Date())
				.setExpiration(expiredt)
				.signWith(SignatureAlgorithm.HS512,securityConstants.JwtSecret)
				.compact();
		return token;
	}
	public String getuserJwt(String token){
		Claims claim = Jwts.parser()
			    .setSigningKey(securityConstants.JwtSecret)
			    .parseClaimsJws(token)
			    .getBody();
		return claim.getSubject();
	}
	public boolean validToken(String token) {
		try {
			Jwts.parser().setSigningKey(securityConstants.JwtSecret).parseClaimsJws(token);
			return true;
		}catch(Exception ex) {
			throw new AuthenticationCredentialsNotFoundException("expired or incorrect");
		}
	}
}
