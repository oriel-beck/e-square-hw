import { createSelector } from "@ngrx/store";

import type { AppState } from "../models/app.model";

export const selectUser = (state: AppState) => state.user;

export const selectWishlist = createSelector(
    selectUser,
    (state) => state.wishlist
);

export const selectUsername = createSelector(
    selectUser,
    (state) => state.username
);

export const selectWishlistLength = createSelector(
    selectUser,
    (state) => state.wishlist.length
);

export const selectPage = createSelector(
    selectUser,
    (state) => state.page
)