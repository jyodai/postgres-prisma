'use client'

import * as React from 'react';
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Header = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              家計簿アプリ
            </Typography>

            <Link href="/add-entry">
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
              >
                <CreateIcon />
              </IconButton>
            </Link>

            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
export default Header;
