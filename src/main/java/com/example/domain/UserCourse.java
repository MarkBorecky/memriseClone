package com.example.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "user_course")
public class UserCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties(value = "userItems", allowSetters = true)
    private User user;

    public UserCourse() {
    }

    public UserCourse(Course course, User user) {
        this.course = course;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserCourse{" +
            "id=" + id +
            ", courseId=" + course.getId() +
            ", userId=" + user.getId() +
            '}';
    }
}
