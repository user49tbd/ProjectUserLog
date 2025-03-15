package com.securityTestPract.securityTestPract.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securityTestPract.securityTestPract.Model.roleEntity;
import com.securityTestPract.securityTestPract.Model.userEntity;
import com.securityTestPract.securityTestPract.Repository.roleRepository;
import com.securityTestPract.securityTestPract.Repository.userRepository;

@RestController
@RequestMapping("/api")
public class ControllerMain {
	
	@Autowired
	userRepository usrE;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	roleRepository rolerep;
	
	@GetMapping("/getusrName/{usr}")
	public ResponseEntity<String> get1(@PathVariable("usr") String usr) {
		//Optional<userEntity> usrRes = usrE.findByName(usr); 
		System.out.println("finding "+usr);
		if(usrE.existsByName(usr)) {
			System.out.println("sendingback");
			return new ResponseEntity<>("Usuário já cadastrado",HttpStatus.OK);
		}
		return new ResponseEntity<>("",HttpStatus.OK);
	}
	@GetMapping("/getAll")
	public ResponseEntity<List<userEntity>> getAll(){
		List<userEntity> arrUsrs = this.usrE.findAll();
		System.out.println(arrUsrs.size());
		return ResponseEntity.ok().body(this.usrE.findAll());
	}
	@GetMapping("/get2")
	public ResponseEntity<String> get2() {
		return new ResponseEntity<>("path get2 ok selected",HttpStatus.OK);
	}
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody userEntity body){
		System.out.println(body.getName());
		if(usrE.existsByName(body.getName())) {
			return new ResponseEntity<>("Usuário já cadastrado",HttpStatus.BAD_REQUEST);
		}
		userEntity usr = new userEntity();
		usr.setName(body.getName());
		usr.setPassword(passwordEncoder.encode(body.getPassword()));
		
		roleEntity rol = rolerep.findByRole("user").get();
		usr.setRoles(Collections.singletonList(rol));
		
		usrE.save(usr);
		return new ResponseEntity<>("usuário registrado",HttpStatus.OK);
		
	}
	@PostMapping("/changePriv")
	public ResponseEntity<String> addRole(@RequestBody userEntity body) {
	    Optional<userEntity> usrEnt = this.usrE.findByName(body.getName());
	    if (usrEnt.isPresent()) {
	    	String currentRole = usrEnt.get().getRoles().get(0).getRole();
	    	Optional<roleEntity> rolOpt = rolerep.findByRole("user");
	    	if(currentRole.equalsIgnoreCase("user")) {
	    		rolOpt = rolerep.findByRole("admin");
	    	}
	        if (rolOpt.isPresent()) {
	            roleEntity rol = rolOpt.get();
	            userEntity usrRes = usrEnt.get();
	            List<roleEntity> roles = new ArrayList<>();
	            roles.add(rol);
	            usrRes.setRoles(roles);
	            usrE.save(usrRes);
	            return new ResponseEntity<>(usrEnt.get().getName()+" registrado para "+rol.getRole(), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Role não encontrado", HttpStatus.BAD_REQUEST);
	        }
	    } else {
	        return new ResponseEntity<>("Usuário não encontrado", HttpStatus.BAD_REQUEST);
	    }
	}
}
