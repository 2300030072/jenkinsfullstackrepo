package com.klef.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.demo.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    
    // custom queries like StudentRepository
    Employee findByEmail(String email);
    Employee findByRole(String role);   // optional extra example
}
