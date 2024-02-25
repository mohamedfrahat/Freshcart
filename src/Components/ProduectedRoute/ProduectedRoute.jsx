import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProduectedRoute(prpos) {
 if (localStorage.getItem('usertoken'))
 {
    return prpos.children
 }
 else{
    return <Navigate to={'/login'}/>
 }
}
