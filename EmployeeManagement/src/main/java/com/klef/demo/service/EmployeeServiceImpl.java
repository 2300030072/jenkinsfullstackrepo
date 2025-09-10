package com.klef.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.demo.entity.Employee;
import com.klef.demo.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    @Override
    public Employee addEmployee(Employee emp) {
        return repo.save(emp);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    @Override
    public Employee getEmployeeById(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Employee updateEmployee(Employee emp) {
        // save() will update if id already exists
        return repo.save(emp);
    }

    @Override
    public void deleteEmployeeById(int id) {
        repo.deleteById(id);
    }
}

