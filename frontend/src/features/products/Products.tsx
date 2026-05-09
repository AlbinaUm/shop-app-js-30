import {CircularProgress, Grid, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {NavLink, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectProducts, selectProductsLoading} from "./store/productsSelectors.ts";
import {useEffect} from "react";
import {fetchProducts} from "./store/productsThunks.ts";
import ProductItem from "./components/ProductItem.tsx";
import {fetchCategories} from "../categories/store/categoriesThunks.ts";
import {selectCategories} from "../categories/store/categoriesSelectors.ts";
import {observer} from "mobx-react-lite";

const Products = observer(() => {
    const [searchParams] = useSearchParams();
    const categoryQuery = searchParams.get('category');
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const categories = useAppSelector(selectCategories);
    const productsFetchLoading = useAppSelector(selectProductsLoading);

    useEffect(() => {
        dispatch(fetchProducts(categoryQuery));

        if (categories.length === 0)  dispatch(fetchCategories());
    }, [dispatch, categoryQuery, categories]);

    return (
        <Grid container spacing={1} justifyContent="space-between">
            <Grid size={2}>
                <Typography variant="h6" gutterBottom>Categories</Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to="/"
                            selected={!categoryQuery}
                        >
                            <ListItemText primary="All products" />
                        </ListItemButton>
                    </ListItem>
                    {categories && categories.length > 0 && categories.map(category => (
                        <ListItemButton
                            key={category._id}
                            component={NavLink}
                            to={`/?category=${category._id}`}
                            selected={categoryQuery === String(category._id)}
                        >
                            <ListItemText primary={category.title} />
                        </ListItemButton>
                    ))}
                </List>
            </Grid>

            <Grid container justifyContent="space-between" size={8}>
                <Grid size={6}>
                    <Typography variant='h4' sx={{mb: 5}}>
                        Products
                    </Typography>

                    <Grid container direction="row" spacing={1} justifyContent="space-between">
                        {productsFetchLoading && <CircularProgress />}
                        {(!productsFetchLoading && products.length === 0) ? <Typography variant='h6'>
                           No products yet
                        </Typography> :
                            <>
                             {products.map(product => (
                                 <ProductItem
                                     key={product._id}
                                     title={product.title}
                                     price={product.price}
                                     image={product.images}
                                     category={product.category}
                                     id={product._id}
                                 />
                             ))}
                            </>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
});

export default Products;