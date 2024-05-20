"use client";
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  const fetchActivities = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/getActivities",
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      

      if (data.success && data.user) {
        setUserInfo(data.user);
      } else {
        console.error("Error fetching activities:", data.message);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  async function logout() {
    try {
      const response = await fetch("http://localhost:4000/api/v1/logout", {
        method: "POST",

        body: JSON.stringify(userInfo),

        credentials: "include",
      });
      const data = await response.json();
      if (data.success === true) {
        const userObj = {
          action: "logged out",
          device: navigator.userAgent,
          userId: userInfo._id,
        };
        if (socket) {
          socket.emit("logout", userObj);
        }
        router.push("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  useEffect(() => {
    const newSocket: Socket = io("http://localhost:4000/");
    setSocket(newSocket);

    newSocket.on("login", (data) => {
      console.log("Notification received:", data);
    });

    fetchActivities();

    // Clean up the event listener and socket on component unmount
    return () => {
      newSocket.off("login");
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, {userInfo.email}
        </h2>
        <div className="bg-gray-100 rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <ul>
            <li>Email: {userInfo.email}</li>
            <li>Role: {userInfo.role}</li>
          </ul>
        </div>
        <div className="bg-gray-100 rounded-md p-4">
          <div className="flex justify-center mt-4">
            <Link
              href="/LoginDetails"
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Click to see login logout details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
