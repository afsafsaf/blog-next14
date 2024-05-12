'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';

import React from 'react';
import { validationSchema } from './validationSchema';
import useLogin from '@/hooks/api/auth/useLogin';

// login hanya butuh email dan password
const Login = () => {
  const { login } = useLogin();

  //karena kita banyak menggunakan fitur dari formik, jadi untuk mempermudah penulisan kita bisa destructuring isi dari formiknya.
  const { errors, touched, handleChange, handleBlur, handleSubmit, values } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        login(values);
      },
    });

  return (
    <>
      <main className="container mx-auto h-[90vh] px-4">
        <div className="mt-40 flex justify-center">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle className="text-center text-3xl text-primary">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  {/* Email */}
                  <FormInput
                    name="email"
                    type="text"
                    label="Email"
                    placeholder="Email"
                    value={values.email}
                    error={errors.email}
                    isError={!!touched.email && !!errors.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {/* Password */}
                  <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    value={values.password}
                    error={errors.password}
                    isError={!!touched.password && !!errors.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
                <Button className="mt-6 w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Login;
