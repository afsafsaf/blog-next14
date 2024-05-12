'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  //jadi kita bakal ngambil idnya. Kalau orangnya sudah login, global statenya bakal ke isi. berarti kalau id nya ada isinya, maka dia akan menampilkan navbar logout. Tapi kalau id usernya belum keisi, maka navbar akan menampilkan login dan register
  const { id } = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem('token'); //untuk menghapus token ketika logout
    dispatch(logoutAction());
  };
  return (
    <>
      <nav className="sticky top-0 z-50 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <h1>Logo</h1>
            {Boolean(id) ? (
              <div className="flex items-center gap-8">
                <h3 onClick={() => router.push('/')} className="cursor-pointer">
                  Home
                </h3>
                <h3
                  onClick={() => router.push('/write')}
                  className="cursor-pointer"
                >
                  Write
                </h3>
                <h3
                  onClick={() => router.push('/profile')}
                  className="cursor-pointer"
                >
                  Profile
                </h3>
                <h3 onClick={logout} className="cursor-pointer">
                  Logout
                </h3>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <h3 onClick={() => router.push('/')} className="cursor-pointer">
                  Home
                </h3>
                <h3
                  onClick={() => router.push('/register')}
                  className="cursor-pointer"
                >
                  Register
                </h3>
                <h3
                  onClick={() => router.push('/login')}
                  className="cursor-pointer"
                >
                  Login
                </h3>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
