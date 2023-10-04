import api from "@/utils/api";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editedInfo, setEditedInfo] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put("/change-password", {
        newPassword,
        confirmNewPassword,
      });
      console.log("Password updated successfully!");
      setShowChangePassword(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
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
