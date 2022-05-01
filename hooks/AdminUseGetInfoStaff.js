import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUseGetInfoStaff = ({ setLoading, setStaff,userNameStaff }) => {
    axios({
        method: 'get',
        url: '/admin/getInfoStaff',
        params: {
            userName: userNameStaff
        }
    })
        .then(response => {
            setStaff(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
}
export default AdminUseGetInfoStaff