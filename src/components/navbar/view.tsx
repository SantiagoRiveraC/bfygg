"use client";

import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { List as MenuIcon, User } from "@phosphor-icons/react"; // Importamos el ícono de menú

interface NavbarProps { 
  toggleDrawer: (param: boolean) => void 
  open: boolean; 
}

export default function Navbar({ toggleDrawer, open }: NavbarProps) {

  return (
    <nav className="bg-blue-600 shadow-md">
      <AppBar position="static" className="bg-transparent shadow-none">
        <Toolbar className="flex justify-between items-center px-4">
          {/* Menú para móviles */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)} className="md:hidden">
            <MenuIcon size={28} weight="bold" className="text-white" />
          </IconButton>

          {/* Logo */}
          <Link href="/" className="text-white text-xl font-bold">
            Before You GoGo
          </Link>

          {/* Links (Ocultos en móviles) */}
          <div className="hidden md:flex space-x-4">
            {["Home", "Products", "Membership", "Profile"].map((text, index) => (
              <Button key={index} color="inherit" component={Link} href={`/${text.toLowerCase()}`} className="text-white">
                {text === 'Profile' 
                ? <IconButton color="inherit" aria-label="profile" className="text-white">
                    <User size={28} weight="bold" className="text-white" />
                  </IconButton>
                  : text
                }
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer para móviles */}
      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <div className="w-64">
          <List>
            {["Home", "Products", "Membership", "Profile"].map((text, index) => (
              <ListItem key={index} component={Link} href={`/${text.toLowerCase()}`} onClick={() => toggleDrawer(false)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
}
