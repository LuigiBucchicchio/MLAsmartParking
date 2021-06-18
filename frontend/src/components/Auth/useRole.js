import { useState } from "react";

export default function useRole() {
  const getRole = () => {
    const roleString = localStorage.getItem("role");
    return roleString;
  };

  const [role, setRole, removeRole] =  useState(getRole());

  const saveRole = userRole => {
    localStorage.setItem("role", userRole);
    setRole(userRole);
  };

  const deleteRole = userRole => {
    localStorage.removeItem("role");
    setRole("")
    //removeRole(userRole);
  }

  return {
    setRole: saveRole,
    removeRole: deleteRole,
    role
  }
}
