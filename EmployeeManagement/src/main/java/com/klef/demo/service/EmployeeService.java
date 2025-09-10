package com.klef.demo.service;

import java.util.List;
import com.klef.demo.entity.Employee;

public interface EmployeeService {
    Employee addEmployee(Employee emp);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(int id);
    Employee updateEmployee(Employee emp);
    void deleteEmployeeById(int id);
}
