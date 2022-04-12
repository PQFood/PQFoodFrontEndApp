import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Alert, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
import WaiterCompleteBookTable from './screens/WaiterCompleteBookTable';
import WaiterHistoryBookTable from './screens/WaiterHistoryBookTable';
import WaiterHistoryOrder from './screens/WaiterHistoryOrder';
import WaiterChangePassword from './screens/WaiterChangePassword';
import DetailOrder from './screens/DetailOrder';

function Navigation(props) {

    const Stack = createNativeStackNavigator();
    const WaiterDrawer = createDrawerNavigator();

    const HomeWaiterDrawer = () => {
        return (
            <WaiterDrawer.Navigator initialRouteName="Home">
                <WaiterDrawer.Screen name="Home" component={HomeWaiter} options={{ drawerIcon: ({focused, size, color})=>(<FontAwesome5 name="home" size={24} color="black" />),title: "Trang chủ phục vụ", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center", }}/>
                <WaiterDrawer.Screen name="Test" component={Test}/>
                <WaiterDrawer.Screen name="WaiterConfirmBookTable" component={WaiterConfirmBookTable} options={{ title: "Xác nhận đặt bàn", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center",drawerIcon: (focused, size, color)=>(<FontAwesome name="calendar-check-o" size={24} color="black" />)  }}/>
                <WaiterDrawer.Screen name="WaiterCompleteBookTable" component={WaiterCompleteBookTable} options={{ title: "Xem lịch đặt bàn", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center", drawerIcon: (focused, size, color)=>(<FontAwesome name="calendar" size={24} color="black" />) }}/>
                <WaiterDrawer.Screen name="WaiterHistoryBookTable" component={WaiterHistoryBookTable} options={{ title: "Lịch sử đặt bàn", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center", drawerIcon: (focused, size, color)=>(<FontAwesome5 name="calendar-alt" size={24} color="black" />) }}/>
                <WaiterDrawer.Screen name="WaiterHistoryOrder" component={WaiterHistoryOrder} options={{ title: "Lịch sử hóa đơn", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center", drawerIcon: (focused, size, color)=>(<FontAwesome5 name="history" size={24} color="black" />) }}/>
                <WaiterDrawer.Screen name="WaiterChangePassword" component={WaiterChangePassword} options={{ title: "Đổi mật khẩu", headerStyle: { backgroundColor: '#fff5cc',}, headerTitleAlign: "center", drawerIcon: (focused, size, color)=>(<MaterialCommunityIcons name="key-change" size={24} color="black" />) }}/>


                <WaiterDrawer.Screen name="LogOut" component={LogOut} options={{ headerShown: false, drawerIcon: ({focused, size, color})=>(<Entypo name="log-out" size={24} color="black" />) }}/>

            </WaiterDrawer.Navigator>
        );
    }

    const HomeChefDrawer = () => {
        return (
            <WaiterDrawer.Navigator initialRouteName="Home">
                <WaiterDrawer.Screen name="Home" component={HomeChef} options={{ title: "Trang chủ dầu bếp", headerStyle: { backgroundColor: '#ffcc66',}, headerTitleAlign: "center",drawerIcon: ({focused, size, color})=>(<FontAwesome5 name="home" size={24} color="black" />)  }}/>
                <WaiterDrawer.Screen name="Test" component={Test} />
                <WaiterDrawer.Screen name="LogOut" component={LogOut} options={{ headerShown: false, drawerIcon: ({focused, size, color})=>(<Entypo name="log-out" size={24} color="black" />) }}/>
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
                <Stack.Screen name="DetailOrder" component={DetailOrder} options={({route})=>({
                    title: "Chi tiết hóa đơn - " + route.params.orderId, 
                    headerTitleAlign: "center", 
                    headerStyle: { backgroundColor: '#ffcc66' }
                })} />


                <Stack.Screen name="TestStack" component={Test} options={{ title: "Test nè", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}



export default Navigation;