import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import parseJWT from 'utils/parseJwt';
import instance from 'utils/axiosIntance';

type User = {
  userId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
};

type LoginStatus = {
  isLogin: boolean;
};

interface Auth {
  user: User;
  loginStatus: LoginStatus;
}

const initialState: Auth = {
  user: {
    userId: null,
    email: '',
    firstName: '',
    lastName: '',
    isVerified: false,
  },
  loginStatus: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.loginStatus.isLogin = true;
    },

    logOutState: (state: Auth) => {
      state.user = initialState.user;
      state.loginStatus = initialState.loginStatus;
    },

    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.loginStatus.isLogin = true;
    },

    updateUserProfile: (state: Auth, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },

    // untuk handle nyimpen value user
    loadUserFromLocalStorage: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      if (user) {
        state.user = user;
        state.loginStatus.isLogin = true;
      }
    },
  },
});

// Handle error function from API (to consume the error to display it in the FE)
const handleError = (
  err: unknown,
  defaultMessage: string,
): { error: string } => {
  const error = err as { response?: { data: string } };
  return {
    error: error.response?.data || defaultMessage,
  };
};

export const register =
  (params: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) =>
  async (dispacth: Dispatch): Promise<{ error?: string }> => {
    try {
      const { email, firstName, lastName, phone } = params;

      await instance().post('/auth/register', {
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: String(phone),
      });
      return {};
    } catch (err) {
      return handleError(err, 'An error occurred during registration');
    }
  };

export const setPassword =
  (params: { token: string; password: string }) =>
  async (dispatch: Dispatch): Promise<{ error?: string }> => {
    try {
      const { token, password } = params;

      await instance().post(
        '/auth/set-password',
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {};
    } catch (err) {
      return handleError(err, 'Failed to set password. Please try again.');
    }
  };

export const login =
  (params: { email: string; password: string }) =>
  async (dispatch: Dispatch): Promise<{ error?: string }> => {
    try {
      const { email, password } = params;

      const { data } = await instance().post('/auth/login', {
        email,
        password,
      });

      const payload = await parseJWT(data?.data);

      dispatch(
        loginState({
          userId: payload?.userId,
          email: payload?.email,
          firstName: payload?.first_name,
          lastName: payload?.last_name,
          isVerified: payload?.isVerified,
        }),
      );
      localStorage.setItem('user', JSON.stringify(payload));
      localStorage.setItem('token', String(data?.data));
      return {};
    } catch (err) {
      return handleError(err, 'An error occurred during login');
    }
  };

export const googleLogin = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance().get('/auth/google');

    // Handle the data from the API response as needed.
    const payload = await parseJWT(data?.data);

    // Dispatch an action to update the auth state
    dispatch(
      loginState({
        userId: payload?.userId,
        email: payload?.email,
        firstName: payload?.first_name,
        lastName: payload?.last_name,
        isVerified: payload?.isVerified,
      }),
    );
    localStorage.setItem('user', JSON.stringify(payload));
    localStorage.setItem('token', String(data?.data));
  } catch (error) {
    throw error;
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logOutState());
    localStorage.removeItem('user'); // Hapus user dari localStorage
    localStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};

export const checkToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance().get('/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await parseJWT(data?.data);
    dispatch(
      tokenValidState({
        userId: payload?.userId,
        email: payload?.email,
        firstName: payload?.first_name,
        lastName: payload?.last_name,
        isVerified: payload?.isVerified,
      }),
    );
    localStorage.setItem('user', JSON.stringify(payload)); // Simpan user ke localStorage
    localStorage.setItem('token', String(data?.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser =
  (userId: number, updateData: Partial<User>) => async (dispatch: Dispatch) => {
    try {
      await instance().patch(`/user/profile/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(updateUserProfile(updateData));
    } catch (error) {
      throw error;
    }
  };

// tambahan
export const loadUser = () => (dispatch: Dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(loadUserFromLocalStorage(JSON.parse(user)));
  }
};

export const {
  loginState,
  logOutState,
  tokenValidState,
  updateUserProfile,
  //tambahan
  loadUserFromLocalStorage,
} = authSlice.actions;

export default authSlice.reducer;
