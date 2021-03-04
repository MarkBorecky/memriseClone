package com.example.service;

import com.example.domain.Item;
import com.example.domain.User;
import com.example.domain.UserItem;
import com.example.repository.ItemRepository;
import com.example.repository.UserItemRepository;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserItemService {

    private final UserItemRepository userItemRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public UserItemService(UserItemRepository userItemRepository, ItemRepository itemRepository, UserRepository userRepository) {
        this.userItemRepository = userItemRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public void createUserItemsForCourse(Long courseId) {
        User user = userRepository.getCurrentUser().orElseThrow(IllegalAccessError::new);
        itemRepository.findByCourseId(courseId).stream()
            .map(item -> new UserItem(item, user))
            .forEach(userItemRepository::save);
    }

    public void save(UserItem ui) {
        userItemRepository.save(ui);
    }

    public List<UserItem> findByCourseIdAndUser(Long courseId) {
        return userItemRepository.getItems(courseId);
    }
}
