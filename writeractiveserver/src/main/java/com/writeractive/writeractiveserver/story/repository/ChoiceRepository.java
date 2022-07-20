package com.writeractive.writeractiveserver.story.repository;

import com.writeractive.writeractiveserver.story.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChoiceRepository extends JpaRepository<Choice, UUID> {

    List<Choice> getChoiceByParentChapterId(UUID parentChapterId);
}
