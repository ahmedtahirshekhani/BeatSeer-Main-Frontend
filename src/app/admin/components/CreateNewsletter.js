import React, { useState, useEffect } from "react";
import MediaContent from "../../sections/MediaContent";


const addArtist = async () => {

  
  const res = await fetch(`/api/bs_ai_emerging_artist_list`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  
};
export default function CreateNewsletter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  console.log("selected user:", selectedUser);
  const fetchUsers = async () => {
    try {
      const res = await fetch("/admin/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        const filteredUsers = data.filter(user => user.subFlag === 1);

        setUsers(filteredUsers);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchUsers();
  }, []);

  const handleDistribute = async () => {
    setShowDropdown(true);
    if (users.length === 0) {
      await fetchUsers();
    }
  };

  const sendNewsletter = async (userId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = userId
        ? `/admin/api/send-newsletter/${selectedUser}`
        : `/admin/api/send-newsletter`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "This Week Trendings",
          userId: userId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to distribute.");
      } else {
        setSuccess(
          userId
            ? `Newsletter successfully sent to user ${userId}.`
            : "Newsletter successfully sent to all users."
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

    await addArtist();
  };

  return (
    <div className="items-center justify-center">
      <div className="space-y-6 lg:ml-6">
        <MediaContent />
      </div>
  
      <div>
      <div className="flex justify-center">
        <button
          onClick={handleDistribute}
          disabled={loading}
          className="flex flex-col items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? "Loading..." : "Ok-to Distribute"}
        </button>
      </div>
        <div className="flex justify-center">
        {showDropdown && (
          <div className="w-full max-w-lg space-y-4">
            <div className="flex flex-col">
              <label htmlFor="user-dropdown" className="text-gray-800 font-medium mb-2">
                Select User:
              </label>
              <select
                id="user-dropdown"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={() => sendNewsletter(selectedUser)}
                disabled={!selectedUser || loading}
                className="flex-grow bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? "Sending..." : "Send to Specific User"}
              </button>
              <button
                onClick={() => sendNewsletter(null)}
                disabled={loading}
                className="flex-grow bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? "Sending..." : "Send to All"}
              </button>
            </div>
          </div>
        )}
        </div>

        {error && <p className="text-red-600 text-center font-medium">{error}</p>}
        {success && <p className="text-green-600 text-center font-medium">{success}</p>}
      </div>
    </div>
  );
}
