useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert("Thông báo", "Bạn có chắc muốn thoát ứng dụng?", [
          {
            text: "Hủy",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "Xác nhận", onPress: () => {
              socket?.emit('removeUser',{ userName: user});
              navigation.navigate("Login")
            }
          }
        ]);
        return true;
      }
    );

    return () => backHandler.remove();
  }, [socket]);