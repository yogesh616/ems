// components/EmployeeDashboard.js
import { useEffect, useState } from 'react';
import { getEmployees } from '../utils/taskUtils';

const EmployeeDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const employee = getEmployees().find(emp => emp.email === user.email);
    if (employee) {
      setTasks([{ task: employee.task, taskStatus: employee.taskStatus }]); // Assuming each employee has one task for simplicity
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Employee Dashboard</h2>
      {tasks.map((task, index) => (
        <div key={index} className="mb-4 p-4 border">
          <p>{task.task}</p>
          <p>Status: {task.taskStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeDashboard;
