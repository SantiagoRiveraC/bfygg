"use client";
import { JSX, useState } from "react";
import UserProfile from "@/components/profile/view";
import { User, Gear, CreditCard, ClockCounterClockwise } from "@phosphor-icons/react";

export interface IUserProfile {
    name: string;
    email: string;
    avatarUrl: string;
    membershipStatus: "Free" | "Premium" | "VIP";
}

export interface IUserProfileDashboard {
    user: IUserProfile;
    sections: { name: string; icon: JSX.Element }[];
    selectedSection: string;
    setSelectedSection: (section: string) => void;
}

export default function ProfilePage() {

    const sections = [
        { name: "Profile", icon: <User size={24} /> },
        { name: "Settings", icon: <Gear size={24} /> },
        { name: "Billing", icon: <CreditCard size={24} /> },
        { name: "History", icon: <ClockCounterClockwise size={24} /> },
    ];

    const user: IUserProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
        membershipStatus: "Premium",
    };

    const [selectedSection, setSelectedSection] = useState<string>("Profile");

    return (
        <UserProfile user={user} sections={sections} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
    );
}
