import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import "../styles/globals.css";

// Import your page components
import IndexPage from "./index"; // Ensure the path is correct
import DeckPage from "./deck"; // Replace with your deck page

function MyApp({ Component, pageProps }) {
  const [value, setValue] = useState(0);

  // Define a function to render the selected page
  const renderPage = () => {
    switch (value) {
      case 0:
        return <IndexPage {...pageProps} />;
      case 1:
        return <DeckPage />;
      case 2:
        return <ProfilePage />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">{renderPage()}</div>

      {/* Bottom Tab Bar */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="bg-white shadow-md fixed bottom-0 w-full border-t"
      >
        <BottomNavigationAction label="Swipe" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Deck" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default MyApp;