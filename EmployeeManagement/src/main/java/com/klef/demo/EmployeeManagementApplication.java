package com.klef.demo;

import java.beans.BeanProperty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class EmployeeManagementApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementApplication.class, args);
	   System.out.println("Employee");
	}
}
