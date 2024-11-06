import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Avatar, Spacer } from "@nextui-org/react";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/SupaClient";

const Profile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    avatar_url: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();

      if (!error && data) {
        setProfile(data);
      }
    };
    getProfileData();
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.username}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    setAvatarPreview(URL.createObjectURL(file));

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) return;

    const newAvatarUrl = `https://jhusxvxjjuvpexotajto.supabase.co/storage/v1/object/public/avatars/${filePath}`;
    setProfile((prev) => ({ ...prev, avatar_url: newAvatarUrl }));
    setAvatarPreview(newAvatarUrl);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: newAvatarUrl })
      .eq("id", profile.id);

    if (updateError) return;
  };

  const saveProfileChanges = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        username: profile.username,
        avatar_url: profile.avatar_url,
        email: profile.email,
        phone: profile.phone,
      })
      .eq("id", profile.id);

    if (!error) {
      setIsEditing(false);
      window.location.reload();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="p-6 w-full rounded-lg">
          <h1 className="text-2xl font-semibold text-yellow-200 mb-4">
            Profile
          </h1>
          <div className="flex flex-col mb-4">
            <Avatar
              size="lg"
              src={avatarPreview || profile.avatar_url}
              alt="Avatar"
              className="mb-4"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="text-sm text-gray-200 dark:text-gray-400"
              />
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              type="text"
              name="username"
              value={profile.username}
              onChange={(e) => handleChange("username", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={!isEditing}
            />
            <Spacer y={1} />
            <div className="mt-6 flex justify-center">
              {isEditing ? (
                <button
                  className="bg-green-700 text-white py-3 rounded-lg w-full max-w-xs hover:bg-green-600 transition duration-300"
                  onClick={saveProfileChanges}
                >
                  Simpan
                </button>
              ) : (
                <button
                  className="bg-yellow-400 text-white py-3 rounded-lg w-full max-w-xs hover:bg-yellow-300 transition duration-300"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <Spacer y={1} />
          <Button
            color="danger"
            flat
            auto
            className="mt-3"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
