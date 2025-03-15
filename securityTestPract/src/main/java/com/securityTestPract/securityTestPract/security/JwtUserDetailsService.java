package com.securityTestPract.securityTestPract.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.securityTestPract.securityTestPract.Model.roleEntity;
import com.securityTestPract.securityTestPract.Model.userEntity;
import com.securityTestPract.securityTestPract.Repository.userRepository;


@Component
public class JwtUserDetailsService implements UserDetailsService{
	@Autowired
	userRepository usrRep;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		userEntity usr = usrRep.findByName(username) //usrRep.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("username not found"));
		return new User(usr.getName(),usr.getPassword(),maproletoauth(usr.getRoles()));
	}
	public Collection<GrantedAuthority>  maproletoauth(List<roleEntity> role) {
		return role.stream().map(rol->new SimpleGrantedAuthority(rol.getRole())).collect(Collectors.toList());
	}

}
