import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";
import config from "./config.js";

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    salary: ""
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedEmployee, setFetchedEmployee] = useState(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const baseUrl = config.url; // already has /employeeapi

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setEmployees(res.data);
    } catch (error) {
      setMessage("Failed to fetch employees.");
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in employee) {
      if (key !== "id" && (!employee[key] || employee[key].toString().trim() === "")) {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, employee);
      setMessage("Employee added successfully.");
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      setMessage("Error adding employee.");
    }
  };

  const updateEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, employee);
      setMessage("Employee updated successfully.");
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      setMessage("Error updating employee.");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage("Employee deleted successfully.");
      fetchAllEmployees();
    } catch (error) {
      setMessage("Error deleting employee.");
    }
  };

  const getEmployeeById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedEmployee(res.data);
      setMessage("");
    } catch (error) {
      setFetchedEmployee(null);
      setMessage("Employee not found.");
    }
  };

  const handleEdit = (emp) => {
    setEmployee(emp);
    setEditMode(true);
    setMessage(`Editing employee with ID ${emp.id}`);
  };

  const resetForm = () => {
    setEmployee({
      id: "",
      name: "",
      email: "",
      role: "",
      salary: ""
    });
    setEditMode(false);
  };

  return (
    <div className="employee-container">
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>Employee Management System</h2>

      {/* Add/Edit Employee Form */}
      <div>
        <h3>{editMode ? "Edit Employee" : "Add Employee"}</h3>
        <div className="form-grid">
          {editMode && (
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={employee.id}
              readOnly
            />
          )}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={employee.role}
            onChange={handleChange}
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
          />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addEmployee}>
              Add Employee
            </button>
          ) : (
            <>
              <button className="btn-green" onClick={updateEmployee}>
                Update Employee
              </button>
              <button className="btn-gray" onClick={resetForm}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Get by ID */}
      <div>
        <h3>Get Employee By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getEmployeeById}>
          Fetch
        </button>

        {fetchedEmployee && (
          <div>
            <h4>Employee Found:</h4>
            <pre>{JSON.stringify(fetchedEmployee, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Employee Table */}
      <div>
        <h3>All Employees</h3>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.role}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-green"
                          onClick={() => handleEdit(emp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-red"
                          onClick={() => deleteEmployee(emp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManager;
