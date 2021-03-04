package com.example.repository;
import com.example.domain.UserItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Spring Data repository for the UserItem entity.
 */
@Repository
public interface UserItemRepository extends JpaRepository<UserItem, Long> {

    @Query("select userItem from UserItem userItem where userItem.user.login = ?#{principal.username} and userItem.item.course.id = ?1 and userItem.learned = false")
    List<UserItem> getItemsForLearning(Long courseId);

    @Query("select userItem from UserItem userItem where userItem.user.login = ?#{principal.username} and userItem.item.course.id = ?1 and userItem.learned = false")
    List<UserItem> getItemsForRemembering(Long courseId);

    @Query("select userItem from UserItem userItem where userItem.user.login = ?#{principal.username} and userItem.item.course.id = ?1")
    List<UserItem> getItems(Long courseId);

}
