import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login'
import HomeShipper from './screens/HomeShipper'
import HomeChef from './screens/HomeChef'
import HomeWaiter from './screens/HomeWaiter'
import HomeAdmin from './screens/HomeAdmin'
import WaiterAddOrder from './screens/WaiterAddOrder'
import WaiterDetailOrder from './screens/WaiterDetailOrder'
import WaiterPayOrder from './screens/WaiterPayOrder'
import Test from './screens/Test'
import WaiterCompleteFood from './screens/WaiterCompleteFood'
import WaiterEditOrder from './screens/WaiterEditOrder'
import ChefPayOrder from './screens/ChefPayOrder'
import ChefDetailOrder from './screens/ChefDetailOrder';
import ChefCompleteFood from './screens/ChefCompleteFood';
import ChefNotification from './screens/ChefNotification';
import LogOut from './screens/LogOut';
import WaiterConfirmBookTable from './screens/WaiterConfirmBookTable';

function Navigation(props) {

    const Stack = createNativeStackNavigator();
    const WaiterDrawer = createDrawerNavigator();

    const HomeWaiterDrawer = () => {
        return (
            <WaiterDrawer.Navigator initialRouteName="Home">
                <WaiterDrawer.Screen name="Home" component={HomeWaiter} options={{ title: "Trang chủ phục vụ", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center",  }}/>
                <WaiterDrawer.Screen name="Test" component={Test} />
                <WaiterDrawer.Screen name="LogOut" component={LogOut} options={{ headerShown: false }}/>
                <WaiterDrawer.Screen name="WaiterConfirmBookTable" component={WaiterConfirmBookTable} options={{ title: "Xác nhận đặt bàn", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center",  }}/>

            </WaiterDrawer.Navigator>
        );
    }

    const HomeChefDrawer = () => {
        return (
            <WaiterDrawer.Navigator initialRouteName="Home">
                <WaiterDrawer.Screen name="Home" component={HomeChef} options={{ title: "Trang chủ dầu bếp", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center",  }}/>
                <WaiterDrawer.Screen name="Test" component={Test} />
                <WaiterDrawer.Screen name="LogOut" component={LogOut} options={{ headerShown: false }}/>
            </WaiterDrawer.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
                <Stack.Screen name="HomeShipper" component={HomeShipper} options={{ headerShown: false }} />
                <Stack.Screen name="HomeWaiter" component={HomeWaiterDrawer} options={{ headerShown: false }}  />
                <Stack.Screen name="HomeChef" component={HomeChefDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="WaiterDetailOrder" component={WaiterDetailOrder} options={{ title: "Chi Tiết Hóa Đơn", headerStyle: { backgroundColor: '#ffcc66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterPayOrder" component={WaiterPayOrder} options={{ title: "Thanh Toán Hóa Đơn", headerStyle: { backgroundColor: '#99ff66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterAddOrder" component={WaiterAddOrder} options={({route})=>({title: route.params.nameTable, headerTitleAlign: "center"})} />
                <Stack.Screen name="WaiterCompleteFood" component={WaiterCompleteFood} options={{ title: "Hoàn Thành Món", headerTitleAlign: "center", headerStyle: { backgroundColor: '#0099ff' }, }} />
                <Stack.Screen name="WaiterEditOrder" component={WaiterEditOrder} options={{ title: "Cập nhật Hóa Đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="ChefPayOrder" component={ChefPayOrder} options={{ title: "Chờ thanh Toán", headerTitleAlign: "center", headerStyle: { backgroundColor: '#99ff66' } }} />
                <Stack.Screen name="ChefDetailOrder" component={ChefDetailOrder} options={{ title: "Chi Tiết Hóa Đơn",headerStyle: { backgroundColor: '#ffcc66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="ChefCompleteFood" component={ChefCompleteFood} options={{ title: "Hoàn Thành Món", headerTitleAlign: "center", headerStyle: { backgroundColor: '#0099ff' }, }} />
                <Stack.Screen name="ChefNotification" component={ChefNotification} options={{ title: "Thông báo", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="TestStack" component={Test} options={{ title: "Test nè", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}



export default Navigation;