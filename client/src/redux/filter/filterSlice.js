import { createSlice } from "@reduxjs/toolkit";
import { priceRange } from "../../utils/constants/filter";

const initialState = {
  searchText: "",
  category: [],
  listingType: [],
  furnishing:[],
  price: structuredClone(priceRange),
  amenities: [],
  page:1,
  limit:6
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload ,page:1};
    },
    addField:(state,action)=>{
      const { field, value } = action.payload;
      return {...initialState,[field]:[value]};
    },
    toggleCheckbox(state, action) {
      const { field, value } = action.payload;
      state.page=1;
      if (state[field].includes(value)) {
        state[field] = state[field].filter((item) => item !== value);
      } else {
        state[field] = [...state[field], value];
      }
    },
    togglePriceCheckbox(state, action) {
      const id = action.payload;
      state.page=1;
      state.price[id].checked = !state.price[id].checked;
    },
    clearFilters() {
      return initialState;
    },
    updatePage(state,action){
      state.page=action.payload
    }
  },
});

export default filterSlice.reducer;
export const { setFilter, toggleCheckbox, togglePriceCheckbox, clearFilters,addField,updatePage } =
  filterSlice.actions;
export const selectFilter = (store) => store.filter;
