import {Grid} from '@mui/material';
import AdminMenu from "./AdminMenu.tsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <Grid container justifyContent={"space-between"}>
            <Grid sx={{width: 200}}>
                <AdminMenu/>
            </Grid>

            <Grid size={{lg: 9}}>
                <Outlet/>
            </Grid>
        </Grid>
    );
};

export default AdminLayout;