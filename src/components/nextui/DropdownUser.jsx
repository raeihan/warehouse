import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  avatar,
  User,
  Button,
} from "@nextui-org/react";

import Profiles from "../../assets/profile.jpg";
import { useAuth } from "../../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";

export default function DropdownUser() {
  const { username, email, avatar } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Failed Logout");
    } else {
      alert("Logout Success");
      navigate("/");
    }
  };

  const { user, role } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user && role == "admin" ? (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: `${avatar}`,
              }}
              className="transition-transform text-white"
              description={email}
              name={username}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-20 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{email}</p>
            </DropdownItem>
            <DropdownItem>
              <Link to={"/profile"}>Profile</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link to={"/login"}>
          <Button color="primary">Login</Button>
        </Link>
      )}
    </div>
  );
}
