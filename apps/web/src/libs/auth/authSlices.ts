import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from 'cookies-next';
import parseJWT from 'utils/parseJwt';
import instance from 'utils/axiosIntance';

type User = {
  userId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  avatarFilename: string;
};

type LoginStatus = {
  isLogin: boolean;
};

type Location = {
  latitude: number | null;
  longitude: number | null;
};

interface Auth {
  user: User;
  loginStatus: LoginStatus;
  location: Location;
}

const initialState: Auth = {
  user: {
    userId: null,
    email: '',
    firstName: '',
    lastName: '',
    isVerified: false,
    avatarFilename: '',
  },
  loginStatus: {
    isLogin: false,
  },
  location: {
    // Initialize location state
    latitude: null,
    longitude: null,
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
      deleteCookie('access-token');
      deleteCookie('refresh-token');
    },

    setLocation: (state: Auth, action: PayloadAction<Location>) => {
      console.log('Action payload in setLocation:', action.payload);
      state.location = action.payload;
    },

    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.loginStatus.isLogin = true;
    },

    updateUserProfile: (state: Auth, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },

    loadUserFromToken: (state: Auth) => {
      const accessToken = getCookie('access-token') as string;
      if (accessToken) {
        const user = parseJWT(accessToken) as User;
        state.user = user;
        state.loginStatus.isLogin = true;
      }
    },
  },
});

// Export actions
export const {
  loginState,
  logOutState,
  tokenValidState,
  updateUserProfile,
  loadUserFromToken,
  setLocation,
} = authSlice.actions;

// Handle error function from API
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

      await instance().post('/auth/login', { email, password });
      const accessToken = getCookie('access-token') || '';

      if (!accessToken) throw new Error('Login failed, please retry again.');

      if (accessToken) {
        const user: User = parseJWT(accessToken);
        console.log('Parsed User Data:', user); // Debugging parsed user
        dispatch(loginState(user));
      }
      return {};
    } catch (err) {
      console.error('Login Error:', err); // Logging error for debugging
      return handleError(err, 'An error occurred during login');
    }
  };

export const googleLogin = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance().get('/auth/google');
    const payload = parseJWT(data?.data);

    dispatch(
      loginState({
        userId: payload?.userId,
        email: payload?.email,
        firstName: payload?.first_name,
        lastName: payload?.last_name,
        isVerified: payload?.isVerified,
        avatarFilename: payload?.avatarFilename,
      }),
    );
  } catch (error) {
    throw error;
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logOutState());
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
    const payload = parseJWT(data?.data);
    dispatch(
      tokenValidState({
        userId: payload?.userId,
        email: payload?.email,
        firstName: payload?.first_name,
        lastName: payload?.last_name,
        isVerified: payload?.isVerified,
        avatarFilename: payload?.avatarFilename,
      }),
    );
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
  dispatch(loadUserFromToken()); // Muat user dari access-token
};

export default authSlice.reducer;
