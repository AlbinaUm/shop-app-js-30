import type {RootState} from "../../../app/store.ts";

export const selectCategories = (state: RootState) => state.categories.categories;