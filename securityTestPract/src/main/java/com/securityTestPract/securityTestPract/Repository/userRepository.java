package com.securityTestPract.securityTestPract.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.securityTestPract.securityTestPract.Model.userEntity;


public interface userRepository extends JpaRepository<userEntity,Long> {

	Optional<userEntity> findByName(String name);
	Boolean existsByName(String name);
}
