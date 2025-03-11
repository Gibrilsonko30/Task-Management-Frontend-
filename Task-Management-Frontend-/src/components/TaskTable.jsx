import React, { useState } from "react";
import Select from "react-select";
import "../../src/styles/";

const members = [
  { value: "obinna_williams", label: "Obinna Williams", department: "Engineering", role: "Staff" },
  { value: "vivian", label: "Vivian", department: "Marketing", role: "Intern" },
  { value: "gibril_sonko", label: "Gibril Sonko", department: "HR", role: "Staff" },
  { value: "giddion", label: "Giddion", department: "Finance", role: "Manager" },
  { value: "yetunde", label: "Yetunde", department: "IT", role: "Intern" },
];

const tasksData = [
  { id: 1, name: "Build Login Page", description: "Create a login page UI", assignedTo: "obinna_williams", dueDate: "2025-03-15", status: "completed" },
  { id: 2, name: "SEO Optimization", description: "Improve website SEO", assignedTo: "vivian", dueDate: "2025-03-20", status: "pending" },
  { id: 3, name: "Recruitment Drive", description: "Conduct job interviews", assignedTo: "gibril_sonko", dueDate: "2025-03-18", status: "failed" },
];

const TaskTable = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Status colors for visual indicators
  const statusColors = {
    completed: "status-completed", // Green
    pending: "status-pending", // Gray
    failed: "status-failed", // Red
  };

  // Function to add a new task
  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: `New Task ${tasks.length + 1}`,
      description: "Task description",
      assignedTo: "gibril_sonko",
      dueDate: new Date().toISOString().split("T")[0], // Default to today’s date
      status: "pending",
    };
    setTasks([...tasks, newTask]);
  };

  // Function to remove a task
  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to toggle task details
  const toggleTaskDetails = (taskId) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Calendar</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <tr onClick={() => toggleTaskDetails(task.id)}>
                  <td>
                    <input type="date" defaultValue={task.dueDate} />
                  </td>
                  <td className="task-name">{task.name}</td>
                  <td>{task.description}</td>
                  <td>
                    <Select options={members} defaultValue={members.find(m => m.value === task.assignedTo)} />
                  </td>
                  <td>{task.dueDate}</td>
                  <td>
                    <span className={`status-indicator ${statusColors[task.status]}`}></span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTask(task.id);
                      }}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 mx-2"
                    >
                      -
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addTask();
                      }}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-200"
                    >
                      +
                    </button>
                  </td>
                </tr>

                {selectedTaskId === task.id && (
                  <tr className="task-details">
                    <td colSpan="7">
                      <h3>{task.name}</h3>
                      <p><strong>Description:</strong> {task.description}</p>
                      <p><strong>Assigned To:</strong> {members.find(m => m.value === task.assignedTo)?.label}</p>
                      <p><strong>Due Date:</strong> {task.dueDate}</p>
                      <p><strong>Status:</strong> {task.status}</p>
                      <button onClick={() => setSelectedTaskId(null)}>Close Details ✖</button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
