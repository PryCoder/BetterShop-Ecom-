import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component

const TasksPage = () => {
  // Sample data for tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Water the crops',
      description: 'Make sure to water the fields thoroughly',
      dueDate: '2024-10-08',
      status: 'In Progress',
      priority: 'High',
      assignee: 'John Doe',
    },
    {
      id: 2,
      title: 'Check irrigation system',
      description: 'Inspect all components of the irrigation system',
      dueDate: '2024-10-10',
      status: 'Not Started',
      priority: 'Medium',
      assignee: 'Jane Smith',
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    assignee: '',
  });

  const handleCreateTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask, status: 'Not Started' }]);
    setNewTask({ title: '', description: '', dueDate: '', priority: '', assignee: '' });
  };

  return (
    <div className="TasksPage bg-gray-50 min-h-screen py-6 flex">
      <Sidebar /> {/* Add Sidebar here */}
      <div style={{ flex: 1, paddingTop: '10px' }}> {/* Adjust padding for the content */}
       {/* Include Sidebar here */}

        <div style={{ flex: 1, paddingLeft: '16px' }}> {/* Space between sidebar and content */}
          {/* Add padding top to avoid overlap */}
          <div style={{ paddingTop: '80px' }}> {/* Adjust this value if needed */}
            <Container maxWidth="lg">
              {/* Header Section */}
              <Typography variant="h4" className="font-bold text-center text-green-600 mb-6">Tasks</Typography>
              
              {/* Create Task Form */}
              <div className="mb-6">
                <Typography variant="h6" className="text-gray-700 mb-4">Create New Task</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Task Title"
                      variant="outlined"
                      fullWidth
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Due Date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={2}
                      fullWidth
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Priority"
                      variant="outlined"
                      fullWidth
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      placeholder="High/Medium/Low"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Assignee"
                      variant="outlined"
                      fullWidth
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateTask}
                    >
                      Add Task
                    </Button>
                  </Grid>
                </Grid>
              </div>

              {/* Task List Section */}
              <Typography variant="h6" className="text-gray-700 mb-4">Task List</Typography>
              <Grid container spacing={3}>
                {tasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <Card className="shadow-lg">
                      <CardContent>
                        <Typography variant="h6" className="font-bold">{task.title}</Typography>
                        <Typography className="text-gray-600">{task.description}</Typography>
                        <Typography className="text-gray-500 mt-2">Due: {task.dueDate}</Typography>
                        <Typography className={`text-sm mt-2 ${task.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                          Status: {task.status}
                        </Typography>
                        <Typography className="text-gray-600 mt-1">Priority: {task.priority}</Typography>
                        <Typography className="text-gray-600 mt-1">Assignee: {task.assignee}</Typography>
                        <div className="mt-4 flex justify-between">
                          <Button variant="outlined" color="primary">Edit</Button>
                          <Button variant="outlined" color="secondary">Delete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
