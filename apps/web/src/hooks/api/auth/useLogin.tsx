'use client';
import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';

interface LoginArgs extends Omit<User, 'id' | 'fullName'> {
  password: string;
}

interface LoginResponse {
  message: string;
  data: User;
  token: string;
}

const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        '/auth/login',
        payload,
      );

      //disini kita panggil action untuk login yang ada di file userSlice di redux.
      dispatch(loginAction(data.data));

      //setelah kita berhasil login datanya bakal kita masukkan ke global state. Setelah data usernya kita masukkin ke global state, habis itu kita masukin tokennya ke local storage supaya bisa keep login.
      localStorage.setItem('token', data.token);
      router.replace('/');
      //disini untuk menambahkan toast ketika berhasil login
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data);
      }
      //disini kita juga bisa menambahkan toast ketika password yang diinput user
    }
  };
  return { login };
};

export default useLogin;
