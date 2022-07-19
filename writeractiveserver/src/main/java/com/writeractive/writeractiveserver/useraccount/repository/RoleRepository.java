package com.writeractive.writeractiveserver.useraccount.repository;

import com.writeractive.writeractiveserver.useraccount.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);
}
