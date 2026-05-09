import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSelectors.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);


    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center" sx={{width: '100%'}}>

                    <Typography variant='h6' component="div" sx={{flexGrow: 1}}>
                        <Link to='/'>CompStore</Link>
                    </Typography>
                    <Grid>
                        {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
                    </Grid>
                </Grid>

            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;