import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";

import Profiles from "../../assets/profile.jpg"

export default function DropdownUser() {
  return (
    <div className="flex items-center gap-4">
      
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: Profiles,
            }}
            className="transition-transform text-white"
            description="@raihandy26"
            name="Raihan Mahdy"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-20 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@raihandy26</p>
          </DropdownItem>
          
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
