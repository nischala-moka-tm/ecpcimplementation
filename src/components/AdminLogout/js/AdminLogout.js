import React from "react";
import "../scss/AdminLogout.scss";
import { FaSignOutAlt } from "react-icons/fa";

function AdminLogout() {
  return (
    <div className="admin-logout">
      Hello, <strong>Robert</strong>&nbsp;&nbsp;
      <FaSignOutAlt />
    </div>
  );
}

export default AdminLogout;
