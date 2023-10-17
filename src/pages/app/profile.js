import api from '@/utils/api';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { MessageContext } from "@/contexts/message";
import { useState, useEffect, useContext } from 'react';

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const showMessage = useContext(MessageContext);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    birthday: '',
    created_at: '',
  });

  useEffect(() => {
    if (session === undefined) {
      return;
    }

    if (!session) {
      router.push('/login');
    } else {
      api.get('/profile')
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
          console.error('Error fetching user profile:', error);
        });
    }
  }, [session, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    api.patch('/user/update-profile', userData)
      .then(() => {
        showMessage('success', 'Profile updated successfully!');
        router.reload();
      })
      .catch((error) => {
        showMessage('error', 'Error updating profile.');
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = userData;

    if (newPassword !== confirmNewPassword) {
      showMessage('error', 'Passwords do not match.');
      return;
    }

    api.put('/user/change-password', { newPassword })
      .then(() => {
        showMessage('success', 'Password updated successfully!');
      })
      .catch((error) => {
        showMessage('error', 'Error updating password.');
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
      <h1>Profile</h1>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Birthday: </label>
          <input
            type="date"
            name="birthday"
            value={formatDateForInput(userData.birthday)}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Created At:</label>
          <input
            type="text"
            name="created_at"
            value={formatDateForInput(userData.created_at)}
            readOnly
          />
        </div>
        <br />
        <br />
        <button type="submit">Save Changes</button>
        <br />
        <br />
      </form>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>New Password: </label>
          <input
            type="password"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Confirm New Password: </label>
          <input
            type="password"
            name="confirmNewPassword"
            value={userData.confirmNewPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        <br />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
