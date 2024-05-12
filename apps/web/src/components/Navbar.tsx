'use client';

import { useAppSelector } from '@/redux/hooks';

export const Navbar = () => {
  //jadi kita bakal ngambil idnya. Kalau orangnya sudah login, global statenya bakal ke isi. berarti kalau id nya ada isinya, maka dia akan menampilkan navbar logout. Tapi kalau id usernya belum keisi, maka navbar akan menampilkan login dan register
  const { id } = useAppSelector((state) => state.user);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <h1>Logo</h1>
            {Boolean(id) ? (
              <div className="flex items-center gap-8">
                <h3>Home</h3>
                <h3>Write</h3>
                <h3>Profile</h3>
                <h3>Logout</h3>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <h3>Home</h3>
                <h3>Register</h3>
                <h3>Login</h3>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
