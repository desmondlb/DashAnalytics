import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/Layout";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      {/* We use browser router to help us create navigation bar
      we also create our own component called Layout.
      So every Route created in Route will have Layout as it's parent.*/}
      <BrowserRouter> 
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/products" element={<Products/>} />
              <Route path="/customers" element={<Customers/>} />
              <Route path="/transactions" element={<Transactions/>} />
              <Route path="/geography" element={<Geography/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
