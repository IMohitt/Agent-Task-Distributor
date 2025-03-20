import { useState, useEffect } from "react";
import { getAgents, createAgent, updateAgent, deleteAgent } from "../services/api";
import Sidebar from "../components/Sidebar";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const data = await getAgents();
    setAgents(data.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateAgent(form, editingId);
      setEditingId(null);
    } else {
      await createAgent(form);
      alert("Agent added successfully");
    }
    setForm({ name: "", email: "", mobile: "", password: "" });
    fetchAgents(); // Refresh agent list
  };

  const handleEdit = (agent) => {
    setForm({ ...agent, password: "" });
    setEditingId(agent._id);
  };

  const handleDelete = async (id) => {
    await deleteAgent(id);
    fetchAgents();
  };

  return (
    <div className="flex h-screen ">
        <div className="fixed">
        <Sidebar />
        </div>
    <div className="ml-60 h-screen bg-gray-100 items-center flex w-full">
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Manage Agents</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Agent Name"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="Phone Number"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            required={!editingId}
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            {editingId ? "Update Agent" : "Add Agent"}
          </button>
        </form>

    
        <ul className="mt-6 space-y-2">
          {agents.map((agent) => (
            <li key={agent._id} className="flex justify-between p-2 border rounded-md bg-gray-50">
              <p>{agent.name} ({agent.email}) - {agent.mobile}</p>
              <div>
                <button onClick={() => handleEdit(agent)} className="mr-2 text-white bg-blue-500 p-2 px-4 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(agent._id)} className="text-white bg-red-500 p-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Agents;
