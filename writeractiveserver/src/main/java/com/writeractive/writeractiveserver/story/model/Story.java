package com.writeractive.writeractiveserver.story.model;

import com.writeractive.writeractiveserver.useraccount.model.User;
import com.writeractive.writeractiveserver.util.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
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
    @Column(columnDefinition = "binary(16)")
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

    @OneToMany
    private List<Chapter> chapters = new ArrayList<>();

    @OneToOne
    private Chapter firstChapter;
}
