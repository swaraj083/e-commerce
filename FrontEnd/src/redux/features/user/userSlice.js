import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host = process.env.SERVER_URL;

const AUTHTOKEN = localStorage.getItem("authtoken") !== null ? localStorage.getItem("authtoken") : null;
const USERINFO = JSON.parse(localStorage.getItem("userInfo")) || null;
const initialState = {
  status: "idle",
  authtoken: AUTHTOKEN,
  userInfo: USERINFO,
  isLoggedIn: false,
  errorMessage: null,
}


export const signUpUser = createAsyncThunk("URL", async (credentials) => {
  try {
    const response = await fetch(`${host}/users/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    return data;
  } catch (e) {
    return e.message;
  }
});

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (credentials) => {
    try {
      const response = await fetch(`${host}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return e.message;
    }
  },
);

export const updateUser = createAsyncThunk("users/updateUser",async({id,userDetails})=>{
  try {
   const response = await fetch(`${host}/users/update-user/${id}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "authtoken": localStorage.getItem("authtoken")
    },
      body:JSON.stringify(userDetails)
   });
   const data = await response.json();
   return data;
  } catch (e) {
    return e.message;
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetErrorMessage: (state) => {
      state.errorMessage = null;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    logOutUser: (state) => {
      state.userInfo = null;
      state.authtoken = null;
      localStorage.removeItem("authtoken")
      localStorage.removeItem("userInfo");
      state.isLoggedIn = false;
    },
    gettokens: (state) => {
      state.authtoken = localStorage.getItem("authtoken") !== null ? localStorage.getItem("authtoken") : null;
      state.userInfo = JSON.parse(localStorage.getItem("userInfo")) !== null ? JSON.parse(localStorage.getItem("userInfo")) : null;
      if (state.authtoken && state.userInfo) {
        state.isLoggedIn = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.status = "fulfilled";
          state.authtoken = action.payload.authtoken;
          state.userInfo = action.payload.userInfo;
          localStorage.setItem("authtoken", action.payload.authtoken);
          localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
          state.isLoggedIn = true;
        } else {
          state.status = "rejected";
          state.errorMessage = action.payload.msg;
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "rejected";
        state.errorMessage = action.errorMessage.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.status = "fulfilled";
          state.authtoken = action.payload.authtoken;
          state.userInfo = action.payload.userInfo;
          localStorage.setItem("authtoken", action.payload.authtoken);
          localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
          state.errorMessage = null;
          state.isLoggedIn = true;
        } else {
          state.status = "rejected";
          state.errorMessage = action.payload.msg;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.errorMessage = action.errorMessage.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.status = "fulfilled";
          state.userInfo = action.payload.userInfo;
          state.errorMessage = null;
          state.isLoggedIn = true;
          localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
        } else {
          state.status = "rejected";
          state.errorMessage = action.payload.msg;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "rejected";
        state.errorMessage = action.errorMessage.message;
      });
  },
});

export const { setUserInfo, resetErrorMessage, setErrorMessage, logOutUser, gettokens } = userSlice.actions;

export default userSlice.reducer;
