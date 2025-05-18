package com.test.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "data_kendaraan")
public class Data implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "number", nullable = false, unique = true)
  private String number;

  @Column(nullable = false)
  private String name;

  @Column(columnDefinition = "TEXT")
  private String address;

  private String merk;

  @Column(length = 4)
  private Integer year;

  private String capacities;

  private String color;

  private String fuelType;

  public Data() {
  }

  public Data(String number, String name, String address, String merk, Integer year, String capacities,
      String color, String fuelType) {
    this.number = number;
    this.name = name;
    this.address = address;
    this.merk = merk;
    this.year = year;
    this.capacities = capacities;
    this.color = color;
    this.fuelType = fuelType;
  }

  public String getNumber() {
    return number;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getMerk() {
    return merk;
  }

  public void setMerk(String merk) {
    this.merk = merk;
  }

  public Integer getYear() {
    return year;
  }

  public void setYear(Integer year) {
    int currentYear = java.time.Year.now().getValue();
    if (year >= currentYear) {
      throw new IllegalArgumentException("Data gagal ditambahkan " + currentYear); // current year
    }
    this.year = year;
  }

  public String getCapacities() {
    return capacities;
  }

  public void setCapacities(String capacities) {
    this.capacities = capacities;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public String getFuelType() {
    return fuelType;
  }

  public void setFuelType(String fuelType) {
    this.fuelType = fuelType;
  }

}
