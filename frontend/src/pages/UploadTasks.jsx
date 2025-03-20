import { useRef, useState } from "react";
import { uploadTasks } from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UploadTasks = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadTasks(formData);
      setFile(null);
      navigate("/dashboard");
      alert("Tasks uploaded successfully");
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <div className="flex h-screen ">
        <div className="fixed">
        <Sidebar />
        </div>
   <div className="ml-60 h-screen bg-gray-100 items-center flex w-full">
   <div className="max-w-md mx-auto mb-60 p-6 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-semibold text-center mb-4">Upload Tasks</h2>
  <form onSubmit={handleFileUpload} className="flex flex-col space-y-4">
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      required
      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:hidden"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Upload
    </button>
  </form>
</div>

   </div>
   </div>
  
  );
};

export default UploadTasks;
