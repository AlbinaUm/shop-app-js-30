import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from '@mui/icons-material/Delete';
import {NavLink} from "react-router-dom";
import imageNotAvailable from '../../../assets/imageNotAvailable.png';
import styled from "@emotion/styled";
import {apiURL} from "../../../constants.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {deleteProductById, fetchProducts} from "../store/productsThunks.ts";
import type {Category} from "../../../types";

interface Props {
    title: string;
    image: string[];
    category: Category;
    price: number;
    id: string;
}

const ImageCartMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%', // 16:9
});

const ProductItem: React.FC<Props> = ({title, price, id, image, category}) => {
    const dispatch = useAppDispatch();
    let cardImage = imageNotAvailable;

    if (image.length > 0) {
        cardImage = apiURL + '/' + image[0];
    }

    const onDeleteProduct = async (id: string) => {
        await dispatch(deleteProductById(id));
        dispatch(fetchProducts());
    };

    return (
        <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}}>
            <Card sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <ImageCartMedia image={cardImage} title={title}/>
                <CardHeader title={title}/>
                <CardContent sx={{mt: 'auto'}}>
                    <strong>
                        Category: {category.title}
                    </strong>
                    <hr/>
                    <strong>
                        Price: {price} KGS
                    </strong>
                </CardContent>
                <CardActions>
                    <IconButton component={NavLink} to={`/products/${id}`}>
                        <ArrowForwardIcon/>
                    </IconButton>
                    <IconButton onClick={() => onDeleteProduct(id)}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;