package com.writeractive.writeractiveserver.story.repository;

import com.writeractive.writeractiveserver.story.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, UUID> {

    List<Chapter> findAllByStoryId(UUID storyId);
}
