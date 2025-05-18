package com.test.models.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.test.models.entities.Data;;

public interface DataRepo extends CrudRepository<Data, String> {

  List<Data> findByNumberContains(String number);

  List<Data> findByNameContains(String name);

  @Query("SELECT DISTINCT d.color FROM Data d")
  List<String> findDistinctColor();

}
