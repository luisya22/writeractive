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

    private UUID id;

    private String title;
    private String description;
    private String coverPage;
    private String genre;
    private String language;
    private UUID firstChapterId;
    private String slug;
    private boolean published;
    private User owner;
}
