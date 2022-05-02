import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUseGetDinnerTable = ({ setLoading, setDinnerTable, slug }) => {
    axios({
        method: 'get',
        url: '/admin/getInfoDinnerTable',
        params: {
            slug: slug
        }
    })
        .then(response => {
            setDinnerTable(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
}
export default AdminUseGetDinnerTable