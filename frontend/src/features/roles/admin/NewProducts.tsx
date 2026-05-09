import ProductForm from "../../products/components/ProductForm.tsx";
import {Box, Typography} from "@mui/material";
import type {ProductMutation} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {createProduct} from "../../products/store/productsThunks.ts";
import {selectCreateProductLoading} from "../../products/store/productsSelectors.ts";

const NewProducts = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateProductLoading);

    const onCreateNewProduct = async (newProduct: ProductMutation) => {
        await dispatch(createProduct(newProduct));
        navigate("/");
    };

    return (
        <>
            <Box sx={{width: '100%', margin: '20px auto'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}}>
                    New product
                </Typography>

                <ProductForm onSubmit={onCreateNewProduct} loading={loading}/>
            </Box>
        </>
    );
};

export default NewProducts;