package com.securityTestPract.securityTestPract;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication()
public class SecurityTestPractApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityTestPractApplication.class, args);
	}

}
