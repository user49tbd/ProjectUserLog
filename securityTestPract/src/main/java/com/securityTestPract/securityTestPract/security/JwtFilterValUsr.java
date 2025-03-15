package com.securityTestPract.securityTestPract.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.securityTestPract.securityTestPract.Model.userEntity;
import com.securityTestPract.securityTestPract.Repository.userRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
@Order(2)
public class JwtFilterValUsr extends OncePerRequestFilter{
	@Autowired
	userRepository usrRep;
	@Autowired
	JwtUserDetailsService loadU;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String h = request.getHeader("Authorization");
		System.out.println("once is executing "+h);
		System.out.println(request.getRequestURI());
		if(StringUtils.hasText(h) && h.contains("Bearer ")) {
			System.out.println("pass check ");
			String tok = h.replace("Bearer","").trim();
			String username = getSubject(tok);
			UserDetails usrR = loadU.loadUserByUsername(username);
			for (GrantedAuthority authority : usrR.getAuthorities()) {
			    System.out.println("Role: " + authority.getAuthority());
			}
			List<GrantedAuthority> authorities = usrR.getAuthorities()
				    .stream() // Convertendo a Collection para Stream
				    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getAuthority())) // Adicionando "ROLE_"
				    .collect(Collectors.toList());
			SecurityContextHolder.getContext().setAuthentication(
				new UsernamePasswordAuthenticationToken(usrR,null,authorities));
		}
		filterChain.doFilter(request, response);
	}
	public String getSubject(String token) {
		Claims cl = Jwts.parser()
				.setSigningKey(securityConstants.JwtSecret)
				.parseClaimsJws(token).getBody();
		return cl.getSubject();
		
	}
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		// TODO Auto-generated method stub
		return request.getRequestURI().equals("/");
	}

}
