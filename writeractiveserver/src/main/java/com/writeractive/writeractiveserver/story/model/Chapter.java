package com.writeractive.writeractiveserver.story.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
public class Chapter extends BaseEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(columnDefinition = "binary(16)")
    private UUID id;

    @Column(columnDefinition = "text")
    private String content;
    private String title;

    @Column(columnDefinition = "int default 1")
    private Integer positionX;

    @Column(columnDefinition = "int default 1")
    private Integer positionY;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean isFinalChapter;

    @Column(columnDefinition = "tinyint(1) default 0")
    private boolean published;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(columnDefinition = "binary(16)")
    Story story;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "parentChapter", cascade = {CascadeType.REMOVE})
    List<Choice> choices = new ArrayList<>();
}
