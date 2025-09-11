package com.klef.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.demo.entity.Employee;
import com.klef.demo.service.EmployeeService;

@RestController
@RequestMapping("/employeeapi")
@CrossOrigin(origins = "ttp://localhost:2030")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // ✅ Home (health check)
    @GetMapping("/")
    public String home() {
        return "Employee Management API is running!";
    }

    // ✅ Add employee
    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee emp) {
        Employee saved = employeeService.addEmployee(emp);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // ✅ Get all employees
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // ✅ Get employee by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable int id) {
        Employee emp = employeeService.getEmployeeById(id);
        if (emp != null) {
            return new ResponseEntity<>(emp, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Employee with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // ✅ Update employee
    @PutMapping("/update")
    public ResponseEntity<?> updateEmployee(@RequestBody Employee emp) {
        Employee existing = employeeService.getEmployeeById(emp.getId());
        if (existing != null) {
            Employee updated = employeeService.updateEmployee(emp);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Employee with ID " + emp.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // ✅ Delete employee
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
        Employee existing = employeeService.getEmployeeById(id);
        if (existing != null) {
            employeeService.deleteEmployeeById(id);
            return new ResponseEntity<>("Employee with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Employee with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
