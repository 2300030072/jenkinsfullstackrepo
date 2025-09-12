package com.klef.demo.service;

import java.util.List;
import com.klef.demo.entity.Employee;

public interface EmployeeService {
    Employee addEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(int id);
    Employee updateEmployee(Employee employee);
    void deleteEmployeeById(int id);
}
