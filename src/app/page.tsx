"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [qrcode, setQRCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [socket, setSocket] = useState<any>();

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setQRCode(data.qrcode);
        setLoggedIn(true);
      } else {
        const error = await response.json();
        console.error("Login error:", error.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  async function verify2fa(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        const userObj = {
          action: "logged in",

          device: navigator.userAgent,

          userId: data.user._id,
        };

        socket.emit("login", userObj);

        if (data.user.role === "USER") {
          router.push("/dashboard");
        }

        if (data.user.role === "ADMIN") {
          router.push("/AdminDashboard");
        }
      } else {
        const error = await response.json();
        console.error("Enable 2FA error:", error.error);
      }
    } catch (error) {
      console.error("Enable 2FA error:", error);
    }
  }

  useEffect(() => {
    const socket: Socket = io("http://localhost:4000/");
    setSocket(socket);

    socket.on("login", (data) => {
      console.log("Notification received:", data);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("login");
    };
  }, []);

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {!loggedIn && (
          <form onSubmit={handleLogin}>
            <input
              className="w-full px-4 py-2 mb-4 rounded-md border focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 mb-4 rounded-md border focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        )}
        {qrcode && loggedIn && (
          <div className="mt-4">
            <img src={qrcode} alt="QR Code" className="mx-auto mb-4" />
            <input
              className="w-full px-4 py-2 mb-4 rounded-md border focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="2FA Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <button
              onClick={verify2fa}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Verify
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
