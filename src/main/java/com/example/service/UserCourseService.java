package com.example.service;

import com.example.domain.*;
import com.example.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserCourseService {

    private final UserCourseRepository userCourseRepository;
    private final UserItemService userItemService;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ItemRepository itemRepository;

    public UserCourseService(UserCourseRepository userCourseRepository, UserItemService userItemService, UserRepository userRepository, CourseRepository courseRepository, ItemRepository itemRepository) {
        this.userCourseRepository = userCourseRepository;
        this.userItemService = userItemService;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.itemRepository = itemRepository;
    }

    public void startLearning(Long courseId) {
        UserCourse uc = userCourseRepository.findByCourseIdAndUserId(courseId);
        System.out.printf("UC %s\n", uc);
        if (uc == null) {
            Course course = courseRepository.findById(courseId).orElseThrow(IllegalAccessError::new);
            User user = userRepository.getCurrentUser().orElseThrow(IllegalAccessError::new);
            UserCourse userCourse = new UserCourse(course, user);
            userCourse.setId(System.currentTimeMillis());
            userCourseRepository.save(userCourse.getId(), userCourse.getCourse().getId(), userCourse.getUser().getId());
            userItemService.createUserItemsForCourse(courseId);
        } else {
            List<Item> items = itemRepository.findByCourseId(courseId);
            List<UserItem> uItems = userItemService.findByCourseIdAndUser(courseId);
            System.out.printf("items = %d | ui = %d\n", items.size(), uItems.size());
            if (items.size() != uItems.size()) {
                List<Long> userItemIds = uItems.stream().map(x -> x.getItem().getId()).collect(Collectors.toList());
                User user = userRepository.getCurrentUser().orElseThrow(IllegalAccessError::new);
                List<UserItem> collect = items.stream().filter(item -> !userItemIds.contains(item.getId()))
                    .map(item -> new UserItem(item, user))
                    .collect(Collectors.toList());
                collect.forEach(userItemService::save);
            }
        }
    }
}
