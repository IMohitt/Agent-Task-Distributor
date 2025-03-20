const Navbar = () => {
    return (
      <div className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-lg">Admin Dashboard</h1>
        <button
          className="bg-red-500 px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    );
  };
  
  export default Navbar;
  