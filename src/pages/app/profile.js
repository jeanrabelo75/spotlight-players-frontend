import Link from "next/link";
import api from "@/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MessageContext } from "@/contexts/message";
import { useState, useEffect, useContext } from "react";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const showMessage = useContext(MessageContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    birthday: "",
    created_at: "",
  });

  useEffect(() => {
    if (session === undefined) {
      return;
    }

    if (!session) {
      router.push("/login");
    } else {
      api
        .get("/profile")
        .then((response) => {
          const { name, email, birthday, created_at } = response.data;
          setUserData({
            name,
            email,
            birthday,
            created_at,
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [session, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    api
      .patch("/user/update-profile", userData)
      .then(() => {
        showMessage("success", "Profile updated successfully!");
        router.reload();
      })
      .catch((error) => {
        showMessage("error", "Error updating profile.");
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = userData;

    if (newPassword !== confirmNewPassword) {
      showMessage("error", "Passwords do not match.");
      return;
    }

    api
      .put("/user/change-password", { newPassword })
      .then(() => {
        showMessage("success", "Password updated successfully!");
      })
      .catch((error) => {
        showMessage("error", "Error updating password.");
      });
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <header className="bg-primary p-4 text-white flex justify-between items-center">
        <div className="text-2xl font-bold">Spotlight Players</div>
      </header>

      <div class="bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-center mt-8">Profile</h1>
        <form className="max-w-lg mx-auto" onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">Birthday:</label>
            <input
              type="date"
              name="birthday"
              value={formatDateForInput(userData.birthday)}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">Created At:</label>
            <input
              type="text"
              name="created_at"
              value={formatDateForInput(userData.created_at)}
              className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded focus:outline-none"
              readOnly
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-full"
          >
            Save Changes
          </button>
        </form>
        <form className="max-w-lg mx-auto mt-8" onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">
              New Password:
            </label>
            <input
              type="password"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">
              Confirm New Password:
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={userData.confirmNewPassword}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-full"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
