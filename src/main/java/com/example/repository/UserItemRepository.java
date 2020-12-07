package com.example.repository;

import com.example.domain.UserItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserItemRepository extends JpaRepository<UserItem, Long> {

    @Query("select userItem from UserItem userItem where userItem.user.login = ?#{principal.username}")
    List<UserItem> findByUserIsCurrentUser();
}
