// components/AdminDashboard.js
import { useEffect, useState } from 'react';
import { getEmployees, setEmployees, updateTaskStatus } from '../utils/taskUtils';

const AdminDashboard = () => {
  const [employees, setEmployeesList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  // Fetch employees from localStorage on initial load
  useEffect(() => {
    const employeeData = getEmployees();
    setEmployeesList(employeeData);
  }, []);

  const handleToggleTask = (email, currentStatus) => {
    const newStatus = currentStatus === 'done' ? 'undone' : 'done';
    updateTaskStatus(email, newStatus);
    setEmployeesList(getEmployees()); // Refresh employee data from localStorage
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (taskName && taskDescription && selectedEmployee) {
      const employeesData = getEmployees();
      const updatedEmployees = employeesData.map(emp => 
        emp.email === selectedEmployee
          ? { ...emp, task: taskName, taskStatus: 'undone', checkMark: false }
          : emp
      );
      setEmployees(updatedEmployees); // Save updated data to localStorage
      setEmployeesList(updatedEmployees); // Refresh the state to display updated employees
      setTaskName(''); // Clear form
      setTaskDescription('');
      setSelectedEmployee('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>

      {/* Task creation form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <h3 className="text-xl mb-2">Assign New Task</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.email} value={emp.email}>{emp.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Assign Task</button>
      </form>

      {/* Display employee tasks */}
      {employees.length === 0 ? (
        <p>No employees available</p>
      ) : (
        employees.map((emp) => (
          <div key={emp.email} className="p-4 border mb-4">
            <p>{emp.name} - {emp.task}</p>
            <button
              onClick={() => handleToggleTask(emp.email, emp.taskStatus)}
              className={`px-4 py-2 rounded ${emp.taskStatus === 'done' ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {emp.taskStatus === 'done' ? 'Mark as Undone' : 'Mark as Done'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
