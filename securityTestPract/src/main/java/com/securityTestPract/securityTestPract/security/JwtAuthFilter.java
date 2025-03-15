package com.securityTestPract.securityTestPract.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.securityTestPract.securityTestPract.DTO.session;
import com.securityTestPract.securityTestPract.Model.userEntity;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
@Order(1)
public class JwtAuthFilter extends UsernamePasswordAuthenticationFilter{

	private final AuthenticationManager authManager;
	@Autowired
	JwtUserDetailsService jwtServ;
	@Autowired
	JwtGen jwtG;

    public JwtAuthFilter(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager); // ✅ Corrige o AuthenticationManager
        this.authManager = authenticationManager;
    }
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		System.out.println("system here check usr");
		//User usrE = new ObjectMapper().readValue(request.getInputStream(),User.class);
		try {
			userEntity usr = new ObjectMapper().readValue(request.getInputStream(), userEntity.class);
			UserDetails usr1 = jwtServ.loadUserByUsername(usr.getName());
			System.out.println("data name "+usr.getName()+" - "+usr.getPassword());
			SecurityContextHolder.getContext()
			.setAuthentication(new UsernamePasswordAuthenticationToken(
		    usr.getName(),
		    usr.getPassword()
					));
			return authManager.authenticate(new UsernamePasswordAuthenticationToken(
	                usr.getName(),
	                usr.getPassword()
	        ));
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("Falha ao eutenticar usuário",e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		// TODO Auto-generated method stub
	    
		session ses = new session();
		ses.setToken(jwtG.generateToken());
		ses.setTimer(securityConstants.JwtTime);
		response.getWriter().write(new ObjectMapper().writeValueAsString(ses));
	}
	
}
