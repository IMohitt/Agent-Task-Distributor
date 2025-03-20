import { useEffect, useState } from "react";
import axios from "axios";
import { getAgents, getTasks } from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [agents, setAgents] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
            try {
              const response = await getTasks();
              console.log("API Response:", response); // Check structure
          
              if (response.data.data && Array.isArray(response.data.data)) {
                setTasks(response.data.data); // Use response.data
              } else {
                console.log("Unexpected response format");
                setTasks([]); // Fallback to empty array
              }
              
              const agentData = await getAgents();
              const agentMap={};
              agentData.data.data.forEach(agent => {
                agentMap[agent._id] = agent.name;
              })
              
              setAgents(agentMap)

            } catch (error) {
              console.error("Error fetching agents:", error);
              alert(error.message);
            }
          };
          fetchTasks();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className=" py-2">
            <p>Name: {task.firstName}</p>
            <p>Phone: {task.phone}</p>
            <p>Task assigned to : {agents[task.agentId]}</p>
        </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
