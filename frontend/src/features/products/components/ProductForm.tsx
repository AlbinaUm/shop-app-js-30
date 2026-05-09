import {Button, CircularProgress, Grid, MenuItem, TextField} from "@mui/material";
import React, {useEffect, useState} from 'react';
import type {ProductMutation} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {fetchCategories} from "../../categories/store/categoriesThunks.ts";
import {selectCategories} from "../../categories/store/categoriesSelectors.ts";
import {z} from "zod";
import FileInput from "../../../components/ui/FileInput/FileInput.tsx";

interface Props {
    onSubmit: (product: ProductMutation) => void;
    loading?: boolean;
}

const productSchema = z.object({
    category: z.string(),
    title: z.string()
        .min(1, 'Title is required')
        .regex(/^[a-zA-Z]+$/, 'Title must contain only English letters'),
    description: z.string().optional(),
    price: z.string().min(1, 'Price is required'),
    images: z.instanceof(FileList).optional(),
});

const ProductForm: React.FC<Props> = ({onSubmit, loading=false}) => {
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const [form, setForm] = useState<ProductMutation>({
        category: ' ',
        title: '',
        price: '',
        description: '',
        images: null,
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const validationResult = productSchema.safeParse(form);

        if (!validationResult.success) {
            const newErrors: {[key: string]: string} = {};


           validationResult.error._zod.def.forEach(field => {
               const indexPath = field.path[0] as string;
               newErrors[indexPath] = field.message;
           });
           setErrors(newErrors);
        } else {
            onSubmit(form);
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        console.log(files);
        if (files) {
            setForm(prevState => ({...prevState, [name]: files}));
        }
    };

    return categories && (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid>
                    <TextField
                        select
                        id="category" label="Category"
                        value={form.category}
                        onChange={inputChangeHandler}
                        name="category"
                        error={!!errors.category}
                        helperText={errors.category}
                    >
                        <MenuItem value=' ' disabled>Select Category</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid>
                    <TextField
                        id="title" label="Title"
                        value={form.title}
                        onChange={inputChangeHandler}
                        name="title"
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </Grid>

                <Grid>
                    <TextField
                        id="price" label="Price"
                        value={form.price}
                        onChange={inputChangeHandler}
                        name="price"
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                </Grid>

                <Grid>
                    <TextField
                        multiline rows={3}
                        id="description" label="Description"
                        value={form.description}
                        onChange={inputChangeHandler}
                        name="description"
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Grid>

                <Grid>
                    <FileInput
                        label='images'
                        name='images'
                        onChange={fileInputChangeHandler}
                        errors={errors}
                    />
                </Grid>

                <Grid>
                    <Button disabled={loading} type="submit" color="primary" variant="contained">Create</Button>
                    {loading && <CircularProgress/>}
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;