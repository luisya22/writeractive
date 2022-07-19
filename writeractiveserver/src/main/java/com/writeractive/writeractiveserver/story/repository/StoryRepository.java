package com.writeractive.writeractiveserver.story.repository;

import com.writeractive.writeractiveserver.story.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StoryRepository extends JpaRepository<Story, UUID> {

    Optional<Story> getStoriesBySlug(String slug);
}
