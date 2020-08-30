package com.example.api.entities;

import com.example.api.enumerations.RoleEnum;

import javax.persistence.*;

@Entity
@Table(name="role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleEnum name;

    public Role(){

    }

    public Role(RoleEnum role){
        this.name = role;
    }

    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id=id;
    }

    public RoleEnum getName(){
        return name;
    }

    public void setName(RoleEnum name) {
        this.name=name;
    }
}
