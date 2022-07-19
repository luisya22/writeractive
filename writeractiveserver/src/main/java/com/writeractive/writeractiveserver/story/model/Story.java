package com.writeractive.writeractiveserver.story.model;

import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.util.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter @NoArgsConstructor @AllArgsConstructor
@Entity
public class Story extends BaseEntity {

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
}
