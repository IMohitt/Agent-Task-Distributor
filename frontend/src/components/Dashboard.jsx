import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import AgentList from "../components/AgentList";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
        <div className="fixed">
        <Sidebar />
        </div>
      
      <div className="flex-1 ml-60 flex flex-col">
        <Navbar />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaskList />
          <AgentList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
