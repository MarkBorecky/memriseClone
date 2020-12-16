package com.example.repository;

import java.util.List;

import com.example.domain.Item;

import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

	List<Item> findByCourseId(Long courseId);
}
