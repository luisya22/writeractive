package com.writeractive.writeractiveserver.reading.model;

import com.writeractive.writeractiveserver.story.model.Chapter;
import com.writeractive.writeractiveserver.story.model.Story;
import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.util.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
public class ReadingSession extends BaseEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(columnDefinition = "binary(16)")
    private UUID id;

    @ManyToOne
    @JoinColumn(columnDefinition = "binary(16)")
    private Story story;

    @ManyToOne
    @JoinColumn(columnDefinition = "binary(16)")
    private Chapter chapter;

    @ManyToOne
    private User user;

    public ReadingSession(User user, Story story, Chapter chapter) {
        this.story = story;
        this.chapter = chapter;
        this.user = user;
    }
}
