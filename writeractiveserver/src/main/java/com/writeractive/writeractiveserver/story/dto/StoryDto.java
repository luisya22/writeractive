package com.writeractive.writeractiveserver.story.dto;

import com.writeractive.writeractiveserver.useraccount.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StoryDto {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    private String title;
    private String description;
    private String coverPage;
    private String genre;
    private String language;

    @Column(length = 512)
    private String slug;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean published;

    @ManyToOne
    private User owner;

    public StoryDto(String title, String description, String coverPage, String genre, String language, String slug, boolean published, User owner) {
        this.title = title;
        this.description = description;
        this.coverPage = coverPage;
        this.genre = genre;
        this.language = language;
        this.slug = slug;
        this.published = published;
        this.owner = owner;
    }
}
