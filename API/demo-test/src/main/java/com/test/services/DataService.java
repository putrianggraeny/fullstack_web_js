package com.test.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.models.entities.Data;
import com.test.models.repos.DataRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DataService {

  @Autowired
  private DataRepo dataRepo;

  public Data save(Data data) {
    Optional<Data> existingData = dataRepo.findById(data.getNumber());
    if (existingData.isPresent()) {
      throw new RuntimeException("Data gagal ditambahkan"); // pk/unique
    }
    return dataRepo.save(data);
  }

  public Data findOne(String number) {
    Optional<Data> data = dataRepo.findById(number);
    if (data.isPresent()) {
      return data.get();
    } else {
      throw new RuntimeException("Data not found with number: " + number);
    }
  }

  public Iterable<Data> findAll() {
    return dataRepo.findAll();
  }

  public void removeOne(String number) {
    dataRepo.deleteById(number);
  }

  public List<Data> findByName(String name) {
    return dataRepo.findByNameContains(name);
  }

  public List<String> getAllColor() {
    return dataRepo.findDistinctColor();
  }

  public List<Data> findByNumberOrName(String number, String name) {
    if (number != null && !number.isEmpty()) {
      return dataRepo.findByNumberContains(number);
    } else if (name != null && !name.isEmpty()) {
      return dataRepo.findByNameContains(name);
    } else {
      return (List<Data>) dataRepo.findAll();
    }
  }

}
