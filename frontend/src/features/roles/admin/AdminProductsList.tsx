import { Grid, Typography, IconButton, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import { fetchProducts } from "../../products/store/productsThunks.ts";
import { selectProducts } from "../../products/store/productsSelectors.ts";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { Product } from "../../../types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";

const AdminProductsList = () => {
    const products = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const columns: GridColDef<Product>[] = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            valueGetter: (_, row) => row.category?.title
        },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => console.log('Edit', params.row._id)}>
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => console.log('Delete', params.row._id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </>
            )
        },
    ];

    return (
        <Grid container direction="column" spacing={2} sx={{ p: 2 }}>
            <Grid >
                <Typography variant="h4" component="h1">Products Control Panel</Typography>
            </Grid>

            <Grid>
                <Button color='primary' component={NavLink} to="/admin/products/new">Add product</Button>
            </Grid>

            <Grid  sx={{ width: '100%' }}>
                <Paper sx={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={products}
                        columns={columns}
                        getRowId={(row) => row._id}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } }
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AdminProductsList;