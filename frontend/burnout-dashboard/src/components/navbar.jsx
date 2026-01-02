import React from "react";

function Navbar() {
  return (
    <div className="w-full h-16 bg-white shadow flex items-center px-6 justify-between">
      <h2 className="text-xl font-semibold">Employee Burnout Monitor</h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 font-medium">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default Navbar;
