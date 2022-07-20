package com.writeractive.writeractiveserver.story.model;

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
public class Choice extends BaseEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(columnDefinition = "binary(16)")
    private UUID id;

    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_chapter_id", columnDefinition = "binary(16)")
    private Chapter parentChapter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "next_chapter_id", columnDefinition = "binary(16)")
    private Chapter nextChapter;
}
