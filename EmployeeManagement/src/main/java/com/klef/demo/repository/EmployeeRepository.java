package com.klef.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.demo.entity.Employee;

public interface   EmployeeRepository extends JpaRepository<Employee, Integer> {

}
