package com.writeractive.writeractiveserver.story.repository;

import com.writeractive.writeractiveserver.story.model.Variable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VariableRepository extends JpaRepository<Variable, UUID> {

    List<Variable> getVariablesByStoryId(UUID storyId);

}
