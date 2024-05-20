"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";

const Cards = () => {
  const [logs, setLogs] = useState([]);
  const [active, setActive] = useState({});

  useEffect(() => {
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
          setLogs(data.user.userActivity);
          setActive(data.user.userActivity[0]);
        } else {
          console.error("Error fetching activities:", data.message);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Activity Logs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 p-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {logs.map((log) => (
            <Card key={log._id} isActive={active} data={log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
