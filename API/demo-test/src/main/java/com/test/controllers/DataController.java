package com.test.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.models.entities.Data;
import com.test.services.DataService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/data")
public class DataController {

  @Autowired
  private DataService dataService;

  // return dataService.save(data);

  @PostMapping
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<?> create(@RequestBody Data data) {
    try {
      Data savedData = dataService.save(data);
      return ResponseEntity.ok(savedData);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @GetMapping()
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public Iterable<Data> findAll() {
    return dataService.findAll();
  }

  @GetMapping("/detail/{number}")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public ResponseEntity<?> findOne(@PathVariable("number") String number) {
    try {
      Data data = dataService.findOne(number);
      return ResponseEntity.ok(data);
    } catch (RuntimeException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
  }

  @PutMapping
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public Data update(@RequestBody Data data) {
    return dataService.save(data);
  }

  @DeleteMapping("/{number}")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public void removeOne(@PathVariable("number") String number) {
    dataService.removeOne(number);
  }

  @GetMapping("/{colors}")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public List<String> getAllColor() {
    return dataService.getAllColor();
  }

  @GetMapping("/search")
  @CrossOrigin(origins = "http://127.0.0.1:5500")
  public List<Data> searchData(
      @RequestParam(required = false) String number,
      @RequestParam(required = false) String name) {
    return dataService.findByNumberOrName(number, name);
  }

}
