import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUseGetFood = ({ setLoading, setFood, slug, setImage  }) => {
    axios({
        method: 'get',
        url: '/admin/getInfoFood',
        params: {
            slug: slug
        }
    })
        .then(response => {
            setFood(response.data)
            setImage(response.data.image)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
}
export default AdminUseGetFood