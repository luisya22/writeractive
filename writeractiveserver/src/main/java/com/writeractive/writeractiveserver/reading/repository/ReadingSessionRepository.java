package com.writeractive.writeractiveserver.reading.repository;

import com.writeractive.writeractiveserver.reading.model.ReadingSession;
import com.writeractive.writeractiveserver.story.model.Chapter;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.useraccount.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReadingSessionRepository extends JpaRepository<ReadingSession, UUID> {

    Optional<ReadingSession> getReadingSessionByUserAndStory(User user, Story story);
    List<ReadingSession> findAllByUser(User user);
}
