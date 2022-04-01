import React from 'react';

import { ToastAndroid } from 'react-native';

const showToast = (data) => {
    ToastAndroid.show(
      data,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    )
  }

export default showToast