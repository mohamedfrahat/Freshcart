import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik, validateYupSchema } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Usercontext } from '../../Context/usercontext';
import { Helmet } from 'react-helmet';


export default function Login() {

  let {usertoken ,setusertoken}= useContext(Usercontext);

  let navigate = useNavigate();
  let [apierror, setApierror] = useState('');
  let [loading, setLoading] = useState(false);
  async function submitdata(values) {
    setLoading(true);
    let { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', values)
      .catch((error) => {
        // console.log(error.response.data.message);
        setApierror(error.response.data.message);
        setLoading(false);

      })

    if (data.message) {
      
      localStorage.setItem('usertoken', data.token);
      setusertoken( data.token );

      setLoading(false);
      navigate('/');
      
    }






  }

  let validationSchema = Yup.object({

    email: Yup.string().required().email(),
    password: Yup.string().required().matches(/^[A-Z]@[\w\d@$!%*?&]{7,19}$/, 'password must be valid'),

  })


  let formik = useFormik({
    initialValues: {

      email: '',
      password: ''

    }, validationSchema
    , onSubmit: submitdata

  })



  return <>
    <div className="w-75 mx-auto py-3">

      <h2 className='py-5 mt-3'>Login  Now </h2>
      <form onSubmit={formik.handleSubmit}>
        {apierror ? <div className="alert alert-danger" >{apierror}</div> : null}

        <label htmlFor="email">Email: </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control py-2' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger my-2" >{formik.errors.email}</div> : null}

        <label htmlFor="password">Password :</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control py-2 mb-2' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger my-2" >{formik.errors.password}</div> : null}

        {!loading ? <button disabled={!(formik.dirty && formik.isValid)} type='submit' className='btn bg-main text-light '> Submit </button> : <button type='button' className='btn bg-main text-light'> <i className='fas fa-spin fa-spinner '></i> </button>}

        <Link className='ps-3  ' to={'/register'} >register Now  </Link>


      </form>


    </div>
  </>
}
