package com.grupa3.memriseclone.repository;

import com.grupa3.memriseclone.domain.Item;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
}
