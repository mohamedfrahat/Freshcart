import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik, validateYupSchema } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {
  let navigate = useNavigate();
  let [apierror, setApierror] = useState('');
  let [loading, setLoading] = useState(false);
  async function submitdata(values) {
    setLoading(true);
    let { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values)
      .catch((error) => {
        
        setApierror(error.response.data.message);
        setLoading(false);

      })
    setLoading(false);
    navigate('/login');





  }

  let validationSchema = Yup.object({
    name: Yup.string().required('name is requierd ').min(3, 'min length is 3').max(10, 'max length is 10'),
    email: Yup.string().required().email(),
    password: Yup.string().required().matches(/^[A-Z]@[\w\d@$!%*?&]{7,19}$/, 'password must be valid'),
    rePassword: Yup.string().required().oneOf([Yup.ref('password')], 'password must be matched '),
    phone: Yup.string().required().matches(/^(?:(?:\+|00)20)?1[0-2]\d{8}$/, 'phone must be valid one ')
  })


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }, validationSchema
    , onSubmit: submitdata

  })



  return <>
    <div className="w-75 mx-auto py-3">

      <h2 className='py-5 mt-3'>Register Now </h2>
      <form onSubmit={formik.handleSubmit}>
        {apierror ? <div className="alert alert-danger" >{apierror}</div> : null}

        <label htmlFor="name"> Name:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='name' name='name' className='form-control py-2' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger my-2" >{formik.errors.name}</div> : null}

        <label htmlFor="email">Email: </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control py-2' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger my-2" >{formik.errors.email}</div> : null}

        <label htmlFor="password">Password :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control py-2 mb-2' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger my-2" >{formik.errors.password}</div> : null}

        <label htmlFor="repassword">RePassword :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword' className='form-control py-2 mb-2' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger my-2" >{formik.errors.rePassword}</div> : null}

        <label htmlFor="phone">Phone :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="number" id='phone' name='phone' className='form-control py-2 mb-2' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger my-2" >{formik.errors.phone}</div> : null}

        {!loading ? <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-light'> Submit </button> : <button type='button' className='btn bg-main text-light'> <i className='fas fa-spin fa-spinner'></i> </button>}
        <Link className='ps-3' to={'/login'} >Login Now  </Link>
      </form>


    </div>
  </>
}
