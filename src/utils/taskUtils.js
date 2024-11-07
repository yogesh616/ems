// utils/taskUtils.js

// Get employees from localStorage
export const getEmployees = () => {
    const employees = JSON.parse(localStorage.getItem('employees'));
    if (employees) {
      return employees;
    } else {
      // Default data for testing
      const defaultEmployees = [
        {
          name: 'John Doe',
          email: 'john@gmail.com',
          password: '123456',
          task: '',
          taskStatus: 'undone',
          checkMark: false,
        },
        {
          name: 'Jane Smith',
          email: 'jane@gmail.com',
          password: '123456',
          task: '',
          taskStatus: 'undone',
          checkMark: false,
        },
        {
          name: 'Bob Johnson',
          email: 'bob@gmail.com',
          password: '123456',
          task: '',
          taskStatus: 'undone',
          checkMark: false,
        },
        {
          name: 'Alice Davis',
          email: 'alice@gmail.com',
          password: '123456',
          task: '',
          taskStatus: 'undone',
          checkMark: false,
        },
        {
          name: 'Charlie Brown',
          email: 'charlie@gmail.com',
          password: '123456',
          task: '',
          taskStatus: 'undone',
          checkMark: false,
        }
      ];
      localStorage.setItem('employees', JSON.stringify(defaultEmployees)); // Save default data
      return defaultEmployees;
    }
  };
  
  // Set employees to localStorage
  export const setEmployees = (employees) => {
    localStorage.setItem('employees', JSON.stringify(employees));
  };
  
  // Get the current user from localStorage
  export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  
  // Set user to localStorage (admin or employee)
  export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  // Update task status for an employee (done/undone)
  export const updateTaskStatus = (email, newStatus) => {
    const employees = getEmployees();
    const updatedEmployees = employees.map((emp) =>
      emp.email === email ? { ...emp, taskStatus: newStatus, checkMark: newStatus === 'done' } : emp
    );
    setEmployees(updatedEmployees);
  };
  
  // Assign a task to an employee (admin only)
  export const assignTaskToEmployee = (taskName, taskDescription, employeeEmail) => {
    const employees = getEmployees();
    const updatedEmployees = employees.map((emp) =>
      emp.email === employeeEmail
        ? { ...emp, task: taskName, taskStatus: 'undone', checkMark: false, taskDescription }
        : emp
    );
    setEmployees(updatedEmployees);
  };
  