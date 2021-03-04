package com.example.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A UserItem.
 */
@Entity
@Table(name = "user_item")
public class UserItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "learned", nullable = false)
    private Boolean learned;

    @NotNull
    @Column(name = "correct_answers", nullable = false)
    private Integer correctAnswers;

    @NotNull
    @Column(name = "wrong_answers", nullable = false)
    private Integer wrongAnswers;

    @Column(name = "last_correct_answer")
    private LocalDate lastCorrectAnswer;

    @Column(name = "planned_reminder")
    private LocalDate plannedReminder;

    @ManyToOne
    @JsonIgnoreProperties(value = "userItems", allowSetters = true)
    private Item item;

    @ManyToOne
    @JsonIgnoreProperties(value = "userItems", allowSetters = true)
    private User user;

    public UserItem() {
    }

    public UserItem(Item item, User user) {
        this.id = System.currentTimeMillis();
        this.learned = false;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.item = item;
        this.user = user;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isLearned() {
        return learned;
    }

    public UserItem learned(Boolean learned) {
        this.learned = learned;
        return this;
    }

    public void setLearned(Boolean learned) {
        this.learned = learned;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public UserItem correctAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
        return this;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public Integer getWrongAnswers() {
        return wrongAnswers;
    }

    public UserItem wrongAnswers(Integer wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
        return this;
    }

    public void setWrongAnswers(Integer wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
    }

    public LocalDate getLastCorrectAnswer() {
        return lastCorrectAnswer;
    }

    public UserItem lastCorrectAnswer(LocalDate lastCorrectAnswer) {
        this.lastCorrectAnswer = lastCorrectAnswer;
        return this;
    }

    public void setLastCorrectAnswer(LocalDate lastCorrectAnswer) {
        this.lastCorrectAnswer = lastCorrectAnswer;
    }

    public LocalDate getPlannedReminder() {
        return plannedReminder;
    }

    public UserItem plannedReminder(LocalDate plannedReminder) {
        this.plannedReminder = plannedReminder;
        return this;
    }

    public void setPlannedReminder(LocalDate plannedReminder) {
        this.plannedReminder = plannedReminder;
    }

    public Item getItem() {
        return item;
    }

    public UserItem item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public User getUser() {
        return user;
    }

    public UserItem user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserItem)) {
            return false;
        }
        return id != null && id.equals(((UserItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserItem{" +
            "id=" + getId() +
            ", learned='" + isLearned() + "'" +
            ", correctAnswers=" + getCorrectAnswers() +
            ", wrongAnswers=" + getWrongAnswers() +
            ", lastCorrectAnswer='" + getLastCorrectAnswer() + "'" +
            ", plannedReminder='" + getPlannedReminder() + "'" +
            "}";
    }
}
