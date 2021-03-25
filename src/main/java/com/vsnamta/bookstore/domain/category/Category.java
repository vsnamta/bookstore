package com.vsnamta.bookstore.domain.category;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Category {
    @Id
    @SequenceGenerator(name = "CATEGORY_SEQ_GENERATOR", sequenceName = "CATEGORY_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CATEGORY_SEQ_GENERATOR")
    @Column(name = "CATEGORY_ID")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_ID")
    private Category parent;

    @OneToMany(mappedBy = "parent")
    private List<Category> children = new ArrayList<>();

    @Builder
    public Category(String name, Category parent) {
        this.name = name;
        this.parent = parent;

        if(parent != null) {
            parent.children.add(this);
        }
    }

    public static Category createCategory(String name, Category parent) {
        return Category.builder()
            .name(name)
            .parent(parent)
            .build(); 
    }

    public void update(String name, Category parent) {
        this.name = name;

        if(this.parent != null) {
            this.parent.children.remove(this);
        }

        this.parent = parent;

        if(parent != null) {
            parent.children.add(this);
        }

    }

    public void removeChild(Category category) {
        if(children.contains(category)) {
            children.remove(category);
            category.parent = null;
        }
    }

    public boolean hasParent() {
        return parent != null;
    }

    public boolean hasChildren() {
        return children.size() > 0;
    }
}