"use client";
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [userActivities, setUserActivities] = useState<any>([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Fetch user activities and user data from the server
    const fetchData = async () => {
      try {
        const activitiesResponse = await fetch(
          "http://localhost:4000/api/v1/getAllActivities",
          {
            credentials: "include",
          }
        );
        const activitiesData = await activitiesResponse.json();

        const filteredUsers = activitiesData.users.filter(
          (user) => user.role === "USER"
        );

        setUserActivities(filteredUsers);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 01-1.06 0L12 12.06l-1.72 1.72a.75.75 0 01-1.06 0L6.97 11.53a.75.75 0 010-1.06l2.25-2.25a.75.75 0 011.06 0L12 9.94l1.72-1.72a.75.75 0 011.06 0l2.25 2.25c.141.14.22.331.22.53z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-2xl font-semibold ml-2">Admin Dashboard</h1>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New User
          </button>
        </div>
      </header>

      <main className="flex-grow p-6">
        <div className="bg-white shadow-md rounded-lg p-6 mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-4">User Accounts</h3>
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li key={user.id} className="py-4 flex items-center">
                  <div className="bg-green-500 text-white rounded-full p-2 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">
                      {user.email}

                      {user.isActive ? (
                        <span className="bg-green-500 w-3 h-3 rounded-full inline-block ml-2"></span>
                      ) : (
                        <span className="bg-red-500 w-3 h-3 rounded-full inline-block ml-2"></span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">User Activities</h3>
            <ul className="divide-y divide-gray-200">
              {userActivities.map((activity) => (
                <li key={activity.id} className="py-4 flex items-center">
                  <div className="bg-blue-500 text-white rounded-full p-2 mr-4">
                    {activity.type === "login" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p>{activity.email}</p>

                    <button
                      onClick={() => handleUserClick(activity._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Click to see login/logout information</span>
                    </button>

                    {
                      (activity.id = selectedUserId ? (
                        <div>
                          {activity.userActivity.map((u) => (
                            <div key={u._id}>
                              <p className="text-gray-800">{u.action}</p>
                              <p className="text-gray-500 text-sm">
                                {new Date(u.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null)
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
