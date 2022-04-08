import React from 'react';
import './App.css';
import Home from "./components/Home";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Product from "./components/Product";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Update from "./components/Update";
import About from "./components/About";

function App() {

    const theme = createTheme();
  return (
    <div className="App">

        <BrowserRouter>
            <header className="App-header">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar >
                        <Toolbar>
                            <Link to={`/`}><CameraIcon sx={{ mr: 2 }} /></Link>
                            <Typography variant="h6" noWrap style={{marginLeft: '20px', marginRight: '20px'}}>
                                <Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>Strona główna</Link>
                            </Typography>
                            <Typography variant="h6" noWrap style={{marginLeft: '20px', marginRight: '20px'}}>
                                <Link to={`/about`} style={{ textDecoration: 'none', color: 'white' }}>O projekcie</Link>
                            </Typography>
                            <Typography variant="h6" noWrap>
                                <Link to={`/product/edit/new`} style={{ textDecoration: 'none', color: 'white' }}>Dodaj produkt</Link>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cosmetics/" element={<Home />} />
                <Route path="/about/" element={<About />} />
                <Route path="/product/:id" element={<Product />}/>
                <Route path="/product/edit/:id" element={<Update />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
