package com.securityTestPract.securityTestPract.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.securityTestPract.securityTestPract.Model.roleEntity;


public interface roleRepository extends JpaRepository<roleEntity,Long> {
	Optional<roleEntity> findByRole(String role);
}
