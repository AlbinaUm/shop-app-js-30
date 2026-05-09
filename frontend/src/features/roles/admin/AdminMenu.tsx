import {Typography, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";

const AdminMenu = () => {
    return (
        <Grid container>
           <Grid>
               <Typography variant="h6">Admin menu</Typography>
           </Grid>

            <Grid>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to='/admin/products'>
                            <ListItemText primary="Products"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to='/admin/categories'>
                            <ListItemText primary="Categories"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
};

export default AdminMenu;