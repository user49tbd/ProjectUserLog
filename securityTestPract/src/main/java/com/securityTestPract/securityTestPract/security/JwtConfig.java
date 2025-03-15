package com.securityTestPract.securityTestPract.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class JwtConfig {

	@Autowired
	JwtUserDetailsService detailServ;
	@Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(detailServ);
        authProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authProvider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,AuthenticationManager authenticationManager) throws Exception {
    	http.csrf(csrf -> csrf.disable())
    	.authorizeHttpRequests(auth->
    	//auth.requestMatchers("/login").permitAll()
    	auth.requestMatchers("/login").permitAll()
    	.requestMatchers("/log").permitAll()
    	.requestMatchers("/api/getAll").hasRole("admin")
    	.requestMatchers("/api/").permitAll()
    	.requestMatchers("/api/changePriv").permitAll()
    	.requestMatchers("/api/register").permitAll()
    	.requestMatchers("/api/getusrName/**").permitAll()
    	.anyRequest().authenticated()
    	)
    	.sessionManagement(session -> 
    	session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilterValUsr(), UsernamePasswordAuthenticationFilter.class);
    	;
        return http.build();
    }
    @Bean
    public JwtAuthFilter jwtAuthFilter(AuthenticationManager authenticationManager) {
        return new JwtAuthFilter(authenticationManager);
    }

    @Bean
    public JwtFilterValUsr jwtFilterValUsr() {
        return new JwtFilterValUsr();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


