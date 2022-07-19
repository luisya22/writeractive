package com.writeractive.writeractiveserver.useraccount.model;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor @Getter @Setter @AllArgsConstructor @ToString
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
