package com.writeractive.writeractiveserver.useraccount.model;

import com.writeractive.writeractiveserver.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor @Getter @Setter @AllArgsConstructor @ToString
@Entity
public class Role extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(fetch =  FetchType.LAZY)
    private Set<User> users = new HashSet<>();
}
