package com.example.web.rest;

import com.example.MemriseCloneApp;
import com.example.domain.UserItem;
import com.example.repository.UserItemRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserItemResource} REST controller.
 */
@SpringBootTest(classes = MemriseCloneApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserItemResourceIT {

    private static final Boolean DEFAULT_LEARNED = false;
    private static final Boolean UPDATED_LEARNED = true;

    private static final Integer DEFAULT_CORRECT_ANSWERS = 1;
    private static final Integer UPDATED_CORRECT_ANSWERS = 2;

    private static final Integer DEFAULT_WRONG_ANSWERS = 1;
    private static final Integer UPDATED_WRONG_ANSWERS = 2;

    private static final LocalDate DEFAULT_LAST_CORRECT_ANSWER = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_CORRECT_ANSWER = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PLANNED_REMINDER = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PLANNED_REMINDER = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UserItemRepository userItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserItemMockMvc;

    private UserItem userItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserItem createEntity(EntityManager em) {
        UserItem userItem = new UserItem()
            .learned(DEFAULT_LEARNED)
            .correctAnswers(DEFAULT_CORRECT_ANSWERS)
            .wrongAnswers(DEFAULT_WRONG_ANSWERS)
            .lastCorrectAnswer(DEFAULT_LAST_CORRECT_ANSWER)
            .plannedReminder(DEFAULT_PLANNED_REMINDER);
        return userItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserItem createUpdatedEntity(EntityManager em) {
        UserItem userItem = new UserItem()
            .learned(UPDATED_LEARNED)
            .correctAnswers(UPDATED_CORRECT_ANSWERS)
            .wrongAnswers(UPDATED_WRONG_ANSWERS)
            .lastCorrectAnswer(UPDATED_LAST_CORRECT_ANSWER)
            .plannedReminder(UPDATED_PLANNED_REMINDER);
        return userItem;
    }

    @BeforeEach
    public void initTest() {
        userItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserItem() throws Exception {
        int databaseSizeBeforeCreate = userItemRepository.findAll().size();
        // Create the UserItem
        restUserItemMockMvc.perform(post("/api/user-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userItem)))
            .andExpect(status().isCreated());

        // Validate the UserItem in the database
        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeCreate + 1);
        UserItem testUserItem = userItemList.get(userItemList.size() - 1);
        assertThat(testUserItem.isLearned()).isEqualTo(DEFAULT_LEARNED);
        assertThat(testUserItem.getCorrectAnswers()).isEqualTo(DEFAULT_CORRECT_ANSWERS);
        assertThat(testUserItem.getWrongAnswers()).isEqualTo(DEFAULT_WRONG_ANSWERS);
        assertThat(testUserItem.getLastCorrectAnswer()).isEqualTo(DEFAULT_LAST_CORRECT_ANSWER);
        assertThat(testUserItem.getPlannedReminder()).isEqualTo(DEFAULT_PLANNED_REMINDER);
    }

    @Test
    @Transactional
    public void createUserItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userItemRepository.findAll().size();

        // Create the UserItem with an existing ID
        userItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserItemMockMvc.perform(post("/api/user-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userItem)))
            .andExpect(status().isBadRequest());

        // Validate the UserItem in the database
        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLearnedIsRequired() throws Exception {
        int databaseSizeBeforeTest = userItemRepository.findAll().size();
        // set the field null
        userItem.setLearned(null);

        // Create the UserItem, which fails.


        restUserItemMockMvc.perform(post("/api/user-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userItem)))
            .andExpect(status().isBadRequest());

        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCorrectAnswersIsRequired() throws Exception {
        int databaseSizeBeforeTest = userItemRepository.findAll().size();
        // set the field null
        userItem.setCorrectAnswers(null);

        // Create the UserItem, which fails.


        restUserItemMockMvc.perform(post("/api/user-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userItem)))
            .andExpect(status().isBadRequest());

        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWrongAnswersIsRequired() throws Exception {
        int databaseSizeBeforeTest = userItemRepository.findAll().size();
        // set the field null
        userItem.setWrongAnswers(null);

        // Create the UserItem, which fails.


        restUserItemMockMvc.perform(post("/api/user-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userItem)))
            .andExpect(status().isBadRequest());

        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserItems() throws Exception {
        // Initialize the database
        userItemRepository.saveAndFlush(userItem);

        // Get all the userItemList
        restUserItemMockMvc.perform(get("/api/user-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].learned").value(hasItem(DEFAULT_LEARNED.booleanValue())))
            .andExpect(jsonPath("$.[*].correctAnswers").value(hasItem(DEFAULT_CORRECT_ANSWERS)))
            .andExpect(jsonPath("$.[*].wrongAnswers").value(hasItem(DEFAULT_WRONG_ANSWERS)))
            .andExpect(jsonPath("$.[*].lastCorrectAnswer").value(hasItem(DEFAULT_LAST_CORRECT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].plannedReminder").value(hasItem(DEFAULT_PLANNED_REMINDER.toString())));
    }
    
    @Test
    @Transactional
    public void getUserItem() throws Exception {
        // Initialize the database
        userItemRepository.saveAndFlush(userItem);

        // Get the userItem
        restUserItemMockMvc.perform(get("/api/user-items/{id}", userItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userItem.getId().intValue()))
            .andExpect(jsonPath("$.learned").value(DEFAULT_LEARNED.booleanValue()))
            .andExpect(jsonPath("$.correctAnswers").value(DEFAULT_CORRECT_ANSWERS))
            .andExpect(jsonPath("$.wrongAnswers").value(DEFAULT_WRONG_ANSWERS))
            .andExpect(jsonPath("$.lastCorrectAnswer").value(DEFAULT_LAST_CORRECT_ANSWER.toString()))
            .andExpect(jsonPath("$.plannedReminder").value(DEFAULT_PLANNED_REMINDER.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUserItem() throws Exception {
        // Get the userItem
        restUserItemMockMvc.perform(get("/api/user-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserItem() throws Exception {
        // Initialize the database
        userItemRepository.saveAndFlush(userItem);

        int databaseSizeBeforeUpdate = userItemRepository.findAll().size();

        // Update the userItem
        UserItem updatedUserItem = userItemRepository.findById(userItem.getId()).get();
        // Disconnect from session so that the updates on updatedUserItem are not directly saved in db
        em.detach(updatedUserItem);
        updatedUserItem
            .learned(UPDATED_LEARNED)
            .correctAnswers(UPDATED_CORRECT_ANSWERS)
            .wrongAnswers(UPDATED_WRONG_ANSWERS)
            .lastCorrectAnswer(UPDATED_LAST_CORRECT_ANSWER)
            .plannedReminder(UPDATED_PLANNED_REMINDER);

        restUserItemMockMvc.perform(put("/api/user-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserItem)))
            .andExpect(status().isOk());

        // Validate the UserItem in the database
        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeUpdate);
        UserItem testUserItem = userItemList.get(userItemList.size() - 1);
        assertThat(testUserItem.isLearned()).isEqualTo(UPDATED_LEARNED);
        assertThat(testUserItem.getCorrectAnswers()).isEqualTo(UPDATED_CORRECT_ANSWERS);
        assertThat(testUserItem.getWrongAnswers()).isEqualTo(UPDATED_WRONG_ANSWERS);
        assertThat(testUserItem.getLastCorrectAnswer()).isEqualTo(UPDATED_LAST_CORRECT_ANSWER);
        assertThat(testUserItem.getPlannedReminder()).isEqualTo(UPDATED_PLANNED_REMINDER);
    }

    @Test
    @Transactional
    public void updateNonExistingUserItem() throws Exception {
        int databaseSizeBeforeUpdate = userItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserItemMockMvc.perform(put("/api/user-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userItem)))
            .andExpect(status().isBadRequest());

        // Validate the UserItem in the database
        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserItem() throws Exception {
        // Initialize the database
        userItemRepository.saveAndFlush(userItem);

        int databaseSizeBeforeDelete = userItemRepository.findAll().size();

        // Delete the userItem
        restUserItemMockMvc.perform(delete("/api/user-items/{id}", userItem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserItem> userItemList = userItemRepository.findAll();
        assertThat(userItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
