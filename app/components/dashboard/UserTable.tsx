"use client";

import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Inactive";
  joined: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer", status: "Pending", joined: "2024-02-10" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", role: "Designer", status: "Active", joined: "2024-02-12" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Manager", status: "Inactive", joined: "2024-01-20" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "Developer", status: "Active", joined: "2024-03-01" },
  { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", role: "Admin", status: "Active", joined: "2024-03-05" },
  { id: 7, name: "George Costanza", email: "george@example.com", role: "Developer", status: "Pending", joined: "2024-03-10" },
  { id: 8, name: "Hannah Abbott", email: "hannah@example.com", role: "Designer", status: "Inactive", joined: "2024-03-12" },
  { id: 9, name: "Ian Wright", email: "ian@example.com", role: "Manager", status: "Active", joined: "2024-03-15" },
  { id: 10, name: "Jane Doe", email: "jane@example.com", role: "Developer", status: "Active", joined: "2024-03-20" },
  { id: 11, name: "Kevin Hart", email: "kevin@example.com", role: "Developer", status: "Active", joined: "2024-03-22" },
  { id: 12, name: "Luna Lovegood", email: "luna@example.com", role: "Designer", status: "Pending", joined: "2024-03-25" },
];

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(mockUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = mockUsers.slice(startIndex, startIndex + itemsPerPage);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active": return "badge-active";
      case "Pending": return "badge-pending";
      case "Inactive": return "badge-inactive";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-dashboard-text-muted">{user.email}</span>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>
                  <span className={`badge ${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <button className="text-dashboard-primary hover:underline font-medium text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-dashboard-text-muted">
          Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, mockUsers.length)}</span> of <span className="font-medium">{mockUsers.length}</span> users
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
