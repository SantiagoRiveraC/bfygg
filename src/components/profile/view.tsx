"use client";
import { IUserProfileDashboard } from ".";
import { Avatar, Card, CardContent, Typography, Chip, Drawer, List, ListItem, ListItemText, Divider, Button } from "@mui/material";

export default function UserProfileDashboard({ user, sections, selectedSection, setSelectedSection }: IUserProfileDashboard) {

  return (
    <div className="flex bg-gray-100">
        {/* Sidebar */}
        <Drawer
        variant="permanent"
        sx={{
            flexShrink: 0,
            width: 256, // Asegura un ancho fijo
            [`& .MuiDrawer-paper`]: {
            width: 256,
            position: "absolute",
            top: "6.8vh",
            bottom: 0,
            height: "83vh", // Asegura que tome toda la altura disponible
            }
        }}
        open>
            <div className="p-4">
                <Avatar src={user.avatarUrl} className="w-20 h-20 mx-auto" />
                <Typography variant="h6" className="text-center mt-2">{user.name}</Typography>
                <Typography variant="body2" className="text-gray-500 text-center">{user.email}</Typography>
                <Chip label={`${user.membershipStatus} Member`} className="mt-2 block mx-auto bg-blue-500 text-white" />
            </div>
            <Divider />
            <List>
                {sections.map((section) => (
                <ListItem key={section.name} className="cursor-pointer" onClick={() => setSelectedSection(section.name)}>
                    {section.icon}
                    <ListItemText primary={section.name} className="ml-3" />
                </ListItem>
                ))}
            </List>
        </Drawer>


      {/* Main Content */}
      <div className="flex-1 p-6">
        <Card className="p-4 shadow-lg flex flex-col justify-center items-center">
          <CardContent>
            <Typography variant="h5">{selectedSection}</Typography>
            <Divider className="my-4" />
            {selectedSection === "Profile" && (
              <div>
                <Typography variant="body1">Welcome to your profile settings.</Typography>
              </div>
            )}
            {selectedSection === "Settings" && (
              <div>
                <Typography variant="body1">Manage your account settings here.</Typography>
              </div>
            )}
            {selectedSection === "Billing" && (
              <div>
                <Typography variant="body1">View and update your payment methods.</Typography>
                <Button variant="contained" color="primary" className="mt-4">Update Payment</Button>
              </div>
            )}
            {selectedSection === "History" && (
              <div>
                <Typography variant="body1">Check your past transactions or bookings.</Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}