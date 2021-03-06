package com.example.repository;

import com.example.domain.Course;
import com.example.domain.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {

    @Query("select userCourse from UserCourse userCourse where userCourse.user.login = ?#{principal.username} and userCourse.course.id = ?1")
    UserCourse findByCourseIdAndUserId(Long courseId);

    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO USER_COURSE (ID, COURSE_ID, USER_ID) VALUES (?,?,?)")
    void save(Long id, Long courseId, Long userId);

    @Query("select userCourse.course.id from UserCourse userCourse where userCourse.user.login = ?#{principal.username}")
    List<Long> findByUserIsCurrentUser();
}
