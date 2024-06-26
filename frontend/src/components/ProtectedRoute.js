import React, {Component, useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({component: 
    Component, ...rest}) => {
       const {auth} = useContext(AuthContext) 
    }