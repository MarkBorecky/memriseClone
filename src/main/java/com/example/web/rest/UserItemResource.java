package com.example.web.rest;

import com.example.domain.UserItem;
import com.example.repository.UserItemRepository;
import com.example.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.example.domain.UserItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserItemResource {

    private final Logger log = LoggerFactory.getLogger(UserItemResource.class);

    private static final String ENTITY_NAME = "userItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserItemRepository userItemRepository;

    public UserItemResource(UserItemRepository userItemRepository) {
        this.userItemRepository = userItemRepository;
    }

    /**
     * {@code POST  /user-items} : Create a new userItem.
     *
     * @param userItem the userItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userItem, or with status {@code 400 (Bad Request)} if the userItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-items")
    public ResponseEntity<UserItem> createUserItem(@Valid @RequestBody UserItem userItem) throws URISyntaxException {
        log.debug("REST request to save UserItem : {}", userItem);
        if (userItem.getId() != null) {
            throw new BadRequestAlertException("A new userItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserItem result = userItemRepository.save(userItem);
        return ResponseEntity.created(new URI("/api/user-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-items} : Updates an existing userItem.
     *
     * @param userItem the userItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userItem,
     * or with status {@code 400 (Bad Request)} if the userItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-items")
    public ResponseEntity<UserItem> updateUserItem(@Valid @RequestBody UserItem userItem) throws URISyntaxException {
        log.debug("REST request to update UserItem : {}", userItem);
        if (userItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserItem result = userItemRepository.save(userItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, userItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-items} : get all the userItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userItems in body.
     */
    @GetMapping("/user-items")
    public List<UserItem> getAllUserItems() {
        log.debug("REST request to get all UserItems");
        return userItemRepository.findAll();
    }

    /**
     * {@code GET  /user-items/:id} : get the "id" userItem.
     *
     * @param id the id of the userItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-items/{id}")
    public ResponseEntity<UserItem> getUserItem(@PathVariable Long id) {
        log.debug("REST request to get UserItem : {}", id);
        Optional<UserItem> userItem = userItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userItem);
    }

    /**
     * {@code DELETE  /user-items/:id} : delete the "id" userItem.
     *
     * @param id the id of the userItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-items/{id}")
    public ResponseEntity<Void> deleteUserItem(@PathVariable Long id) {
        log.debug("REST request to delete UserItem : {}", id);
        userItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
