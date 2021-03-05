package com.example.repository;

import com.example.domain.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
    UserCourse findByCourseId(Long courseId);

    @Modifying
    @Query(nativeQuery = true, value = "INSERT INTO USER_COURSE (ID, COURSE_ID, USER_ID) VALUES (?,?,?)")
    void save(Long id, Long courseId, Long userId);
}
