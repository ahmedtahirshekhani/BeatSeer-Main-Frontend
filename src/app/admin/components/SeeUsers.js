import { useEffect, useState } from 'react';

export default function SeeUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/admin/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch('/admin/api/users', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          setUsers(users.filter(user => user._id !== id));
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="min-w-full table-auto bg-gray-50 rounded-lg shadow-md border border-gray-200">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full table-auto bg-gray-50 rounded-lg shadow-md border border-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-2 py-2 sm:px-2 sm:py-1 text-left text-sm sm:text-xs">Name</th>
                <th className="px-2 py-2 sm:px-2 sm:py-1 text-left text-sm sm:text-xs">Email</th>
                <th className="px-2 py-2 sm:px-2 sm:py-1 text-left text-sm sm:text-xs">Subscription Status</th>
                <th className="px-2 py-2 sm:px-2 sm:py-1 text-left text-sm sm:text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-100 transition-colors duration-300"
                  >
                    <td className="px-2 py-2 sm:px-2 sm:py-1 text-sm">{user.name}</td>
                    <td className="px-2 py-2 sm:px-2 sm:py-1 text-sm">{user.email}</td>
                    <td className="px-2 py-2 sm:px-2 sm:py-1 text-sm">
                      {user.subFlag === 1 ? 'Subscriber' : 'Unsubscribed'}
                    </td>
                    <td className="px-2 py-2 sm:px-2 sm:py-1">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-2 py-2 sm:px-2 sm:py-1 bg-red-500 text-white text-sm rounded hover:bg-red-700 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 text-sm sm:text-xs"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
