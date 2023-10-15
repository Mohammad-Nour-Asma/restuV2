import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import { AddProduct, Products, Reviews, SingleProduct } from "./pages";
import AddIngredients from "./pages/AddIngredients";
import Ingredients from "./pages/Ingredients";
import Offer from "./pages/Offer";
import AddOffer from "./pages/AddOffer";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import CheckUuid from "./pages/CheckUuid";

const sideBarWidth = 250;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const location = useLocation();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: "flex" }}>
        {location.pathname !== "/" && !location.pathname.includes("check") && (
          <>
            <Navbar
              sideBarWidth={sideBarWidth}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Sidebar
              sideBarWidth={sideBarWidth}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          </>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: { xs: 1, md: 2 },
            width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
          }}
        >
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/check/:uuid" element={<CheckUuid />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route
              path="/products/edit/:id"
              element={<AddProduct edit={true} />}
            />
            <Route path="/products/:id" element={<SingleProduct />} />

            <Route path="/reviews" element={<Reviews />} />

            <Route path="/reviews" element={<Reviews />} />
            {/* Ingredients */}
            <Route path="/ingredient/add" element={<AddIngredients />} />
            <Route path="/ingredients" element={<Ingredients />} />

            {/* Offer  */}
            <Route path="/offers" element={<Offer />} />
            <Route path="/offer/add" element={<AddOffer />} />

            {/* Categories */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/add" element={<AddCategory />} />
          </Routes>
        </Box>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
