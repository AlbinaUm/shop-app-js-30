import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import NewProducts from "./features/roles/admin/NewProducts.tsx";
import Products from "./features/products/Products.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {ToastContainer} from "react-toastify";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSelectors.ts";
import AppToolbar from "./components/ui/AppToolbar/AppToolbar.tsx";
import ProtectedRouter from "./components/ui/ProtectedRouter/ProtectedRouter.tsx";
import AdminLayout from "./features/roles/admin/AdminLayout.tsx";
import AdminProductsList from "./features/roles/admin/AdminProductsList.tsx";
import AdminCategoriesList from "./features/roles/admin/AdminCategoriesList.tsx";

const App = () => {
    const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
        <ToastContainer />
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

              <Route path='/admin' element={
                  <ProtectedRouter isAllowed={user && user.role === 'admin'}>
                      <AdminLayout/>
                  </ProtectedRouter>
              }>
                  <Route path="" element={<AdminProductsList/>}/>
                  <Route path="products" element={<AdminProductsList/>}/>
                  <Route path="categories" element={<AdminCategoriesList/>}/>
                  <Route path="products/new" element={<NewProducts/>}/>
              </Route>

            <Route path="*" element={<h1>Not found page</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App
