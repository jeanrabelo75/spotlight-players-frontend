import api from "@/utils/api";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth";
import { MessageContext } from "@/contexts/message";
import React, { useState, useEffect, useContext } from "react";

const Profile = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const showMessage = useContext(MessageContext);

  const [userInfo, setUserInfo] = useState({});
  const [editedInfo, setEditedInfo] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("profile");
        setUserInfo(response.data);
        setEditedInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({ ...editedInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedFields = {};
      for (const key in editedInfo) {
        if (userInfo[key] !== editedInfo[key]) {
          updatedFields[key] = editedInfo[key];
        }
      }
  
      if (Object.keys(updatedFields).length === 0) {
        showMessage("info", "No changes detected.");
        return;
      }
  
      const response = await api.patch("/user/update-profile", updatedFields);
  
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        ...updatedFields,
      }));
  
      showMessage("success", "Profile updated successfully!");
    } catch (error) {
      showMessage("error", "Error updating profile");
      console.error("Error updating profile:", error);
    }
  };
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put("/user/change-password", {
        newPassword,
        confirmNewPassword,
      });

      showMessage("success", "Password updated successfully!");
      setShowChangePassword(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      showMessage("error", "Error updating password");
      console.error("Error updating password:", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <button onClick={() => setShowChangePassword(false)}>Perfil</button>
        <button onClick={() => setShowChangePassword(true)}>
          Alterar Senha
        </button>
      </div>
      {showChangePassword ? (
        <form onSubmit={handlePasswordChange}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editedInfo.email || ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedInfo.name || ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <label>Birthdate:</label>
            <input
              type="date"
              name="birthdate"
              value={editedInfo.birthdate || ""}
              onChange={handleChange}
              readOnly
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
