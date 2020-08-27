package com.example.api.helpers;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.swing.text.html.parser.Entity;

public class UserSpecifications {
    public static Specification<Entity> byColumnNameAndValue(String columnName, String value){
        return new Specification<Entity>() {
            @Override
            public Predicate toPredicate(Root<Entity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.<String>get(columnName), value);
            }
        };
    }
}
