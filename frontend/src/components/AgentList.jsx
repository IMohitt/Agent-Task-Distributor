import { useEffect, useState } from "react";
import { getAgents } from "../services/api";

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
        try {
          const response = await getAgents();
          console.log("API Response:", response); // Check structure
      
          if (response.data.data && Array.isArray(response.data.data)) {
            setAgents(response.data.data); // Use response.data
          } else {
            console.log("Unexpected response format");
            setAgents([]); // Fallback to empty array
          }
        } catch (error) {
          console.error("Error fetching agents:", error);
          alert(error.message);
        }
      };
      
     fetchAgents();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Agents</h2>
      {agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li key={agent._id} className=" py-2">
                <p>Name: {agent.name}</p>
                <p>Email: {agent.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentList;
