// src/pages/EditProfile.js
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserProfile, updateUserProfile } from "../firebase/firestore/userService";

export default function EditProfile() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    avatar: "",
    social: { twitter: "", website: "" },
  });

  useEffect(() => {
    async function loadProfile() {
      const data = await getUserProfile(currentUser.uid);
      if (data) {
        setFormData((prev) => ({
          ...prev,
          ...data,
          social: {
            twitter: data?.social?.twitter || "",
            website: data?.social?.website || "",
          },
        }));
      }
    }
    if (currentUser?.uid) {
      loadProfile();
    }
  }, [currentUser?.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        social: { ...prev.social, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(currentUser.uid, {
      ...formData,
      uid: currentUser.uid,
    });
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Edit Your Profile</h1>

      <input
        name="displayName"
        placeholder="Display Name"
        value={formData.displayName}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="avatar"
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <textarea
        name="bio"
        placeholder="Short bio"
        value={formData.bio}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="social.twitter"
        placeholder="Twitter Link"
        value={formData.social.twitter}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        name="social.website"
        placeholder="Website Link"
        value={formData.social.website}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
