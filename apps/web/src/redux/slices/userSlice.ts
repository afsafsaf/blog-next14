import { User } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState: User = {
    id: 0,
    fullName: "",
    email: "",

};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //action untuk ngisi state kita 
        loginAction: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;

        },
        //action untuk logout. Jadi kalau kita logout kita mau menghilangkan initial state kita, yang tadi ada isinya sekarang menjadi kosong lagi.
        logoutAction: (state) => {
            state.id = 0;
            state.fullName = "";
            state.email = "";

        },
    },
});


export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;