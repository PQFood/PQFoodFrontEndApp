import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUseGetOrder = ({ setLoading, setOrder, link }) => {
    axios({
        method: 'get',
        url: '/admin/'+link,
    })
        .then(response => {
            setOrder(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
}
export default AdminUseGetOrder