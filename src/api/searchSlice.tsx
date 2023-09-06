import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// interface Product {
//     id: number;
//     name: string;
//     price: number,
//     quantity: number;
//     size?: number
// }

interface searchSlice {
    items: any[];
}

const initialState: searchSlice = {
    items: [],
};

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        addSearch: (state, action: PayloadAction<any>) => {
            const newProduct = action.payload;
            state.items.push(newProduct)
            // const existProductIndex = state.items.findIndex(item => item.id === newProduct.id  && item.size === newProduct.size );
            // console.log(existProductIndex);
            // if (existProductIndex === -1 ) {
            //     state.items.push(newProduct);
            // } else {
            //     state.items[existProductIndex].quantity += newProduct.quantity;
            // }
        },
      
        }
    
});

export const { addSearch } = searchSlice.actions;

export const cartReducer = searchSlice.reducer;