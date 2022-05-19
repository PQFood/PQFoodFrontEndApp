import React from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import ChefWarehouse from './screens/ChefWarehouse';
import ChefChangeQuantityWarehouse from './screens/ChefChangeQuantityWarehouse';
import ShipperConfirm from './screens/ShipperConfirm';
import ShipperDetailBookShip from './screens/ShipperDetailBookShip';
import ShipperEditBookShip from './screens/ShipperEditBookShip';
import ChefBookShip from './screens/ChefBookShip';
import ChefConfirmBookShip from './screens/ChefConfirmBookShip';
import ChefProcessBookShip from './screens/ChefProcessBookShip';
import ChefCompleteBookShip from './screens/ChefCompleteBookShip';
import ShipperReceiveBookShip from './screens/ShipperReceiveBookShip';
import ShipperCompleteBookShip from './screens/ShipperCompleteBookShip';
import ShipperHistoryBookShip from './screens/ShipperHistoryBookShip';
import ShipperDetailHistotyBookShip from './screens/ShipperDetailHistotyBookShip';
import AdminConfirmOrder from './screens/AdminConfirmOrder';
import AdminConfirmShip from './screens/AdminConfirmShip';
import AdminCurrentOrder from './screens/AdminCurrentOrder';
import AdminCurrentShip from './screens/AdminCurrentShip';
import AdminDetailOrder from './screens/AdminDetailOrder';
import AdminDetailHistotyBookShip from './screens/AdminDetailHistotyBookShip';
import AdminAddStaff from './screens/AdminAddStaff';
import AdminListStaff from './screens/AdminListStaff';
import AdminEditStaff from './screens/AdminEditStaff';
import AdminListDinnerTable from './screens/AdminListDinnerTable';
import AdminAddDinnerTable from './screens/AdminAddDinnerTable';
import AdminEditDinnerTable from './screens/AdminEditDinnerTable';
import AdminAddFoodMenu from './screens/AdminAddFoodMenu';
import AdminListFood from './screens/AdminListFood';
import AdminEditFoodMenu from './screens/AdminEditFoodMenu';
import AdminListDrink from './screens/AdminListDrink';
import AdminBinMenu from './screens/AdminBinMenu';
import AdminListWarehouse from './screens/AdminListWarehouse';
import AdminAddWareHouse from './screens/AdminAddWareHouse';
import AdminEditWarehouse from './screens/AdminEditWarehouse';
import AdminRevenueDay from './screens/AdminRevenueDay';


function Navigation(props) {

    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();
    const Tab = createBottomTabNavigator();

    const HomeWaiterDrawer = () => {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeWaiter} options={{ drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="home" size={20} color="black" />), title: "Trang chủ phục vụ", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", }} />
                <Drawer.Screen name="WaiterConfirmBookTable" component={WaiterConfirmBookTable} options={{ title: "Xác nhận đặt bàn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<FontAwesome name="calendar-check-o" size={24} color="black" />) }} />
                <Drawer.Screen name="WaiterCompleteBookTable" component={WaiterCompleteBookTable} options={{ title: "Xem lịch đặt bàn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<FontAwesome name="calendar" size={24} color="black" />) }} />
                <Drawer.Screen name="WaiterHistoryBookTable" component={WaiterHistoryBookTable} options={{ title: "Lịch sử đặt bàn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<FontAwesome5 name="calendar-alt" size={24} color="black" />) }} />
                <Drawer.Screen name="WaiterHistoryOrder" component={WaiterHistoryOrder} options={{ title: "Lịch sử hóa đơn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<FontAwesome5 name="history" size={24} color="black" />) }} />
                <Drawer.Screen name="WaiterChangePassword" component={WaiterChangePassword} options={{ title: "Đổi mật khẩu", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<MaterialCommunityIcons name="key-change" size={24} color="black" />) }} />
                <Drawer.Screen name="LogOut" component={LogOut} options={{ title: "Đăng xuất", headerShown: false, drawerIcon: ({ focused, size, color }) => (<Entypo name="log-out" size={26} color="black" />) }} />

            </Drawer.Navigator>
        );
    }

    const HomeChefDrawer = () => {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeChef} options={{ title: "Trang chủ dầu bếp", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="home" size={20} color="black" />) }} />
                <Drawer.Screen name="ChefWarehouse" component={ChefWarehouse} options={{ title: "Quản lý kho", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<FontAwesome5 name="warehouse" size={20} color="black" />) }} />
                <Drawer.Screen name="ChefBookShip" component={ChefBookShip} options={{ title: "Quản lý đơn ship", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<FontAwesome5 name="shipping-fast" size={20} color="black" />) }} />
                <Drawer.Screen name="ShipperHistoryBookShip" component={ShipperHistoryBookShip} options={{ title: "Lịch sử đơn ship", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="history" size={24} color="black" />) }} />
                <Drawer.Screen name="WaiterHistoryOrder" component={WaiterHistoryOrder} options={{ title: "Lịch sử hóa đơn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<FontAwesome5 name="history" size={24} color="black" />) }} />

                <Drawer.Screen name="WaiterChangePassword" component={WaiterChangePassword} options={{ title: "Đổi mật khẩu", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<MaterialCommunityIcons name="key-change" size={24} color="black" />) }} />
                <Drawer.Screen name="LogOut" component={LogOut} options={{ title: "Đăng xuất", headerShown: false, drawerIcon: ({ focused, size, color }) => (<Entypo name="log-out" size={28} color="black" />) }} />
            </Drawer.Navigator>
        );
    }

    const HomeShipperDrawer = () => {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeShipper} options={{ title: "Trang chủ shipper", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="home" size={20} color="black" />) }} />
                <Drawer.Screen name="ShipperHistoryBookShip" component={ShipperHistoryBookShip} options={{ title: "Lịch sử đơn ship", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="history" size={24} color="black" />) }} />

                <Drawer.Screen name="WaiterChangePassword" component={WaiterChangePassword} options={{ title: "Đổi mật khẩu", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<MaterialCommunityIcons name="key-change" size={24} color="black" />) }} />
                <Drawer.Screen name="LogOut" component={LogOut} options={{ title: "Đăng xuất", headerShown: false, drawerIcon: ({ focused, size, color }) => (<Entypo name="log-out" size={28} color="black" />) }} />
            </Drawer.Navigator>
        );
    }

    //tab
    const HomeAdminTab = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'AdminConfirmOrder') {
                            return <MaterialIcons name="payments" size={size + 5} color={color} />
                        } else if (route.name === 'AdminConfirmShip') {
                            return <FontAwesome5 name='shipping-fast' size={size + 5} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminConfirmOrder" component={AdminConfirmOrder} options={{ title: "Đơn offline", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminConfirmShip" component={AdminConfirmShip} options={{ title: "Đơn online", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    const HistoryOrderTab = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return <FontAwesome5 name="history" size={size} color={color} />
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminHistoryOrder" component={WaiterHistoryOrder} options={{ title: "Đơn offline", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminHistoryShip" component={ShipperHistoryBookShip} options={{ title: "Đơn online", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    const OrderCurrentTab = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return <FontAwesome5 name="money-bill" size={size} color={color} />
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminCurrentOrder" component={AdminCurrentOrder} options={{ title: "Đơn offline", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminCurrentShip" component={AdminCurrentShip} options={{ title: "Đơn online", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    const AdminManageStaff = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'AdminListStaff') {
                            return <Ionicons name="person" size={size + 5} color={color} />
                        } else if (route.name === 'AdminAddStaff') {
                            return <AntDesign name="adduser" size={size + 5} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminListStaff" component={AdminListStaff} options={{ title: "Danh sách", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminAddStaff" component={AdminAddStaff} options={{ title: "Thêm", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    const AdminManageDinnerTable = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'AdminListDinnerTable') {
                            return <FontAwesome5 name="object-group" size={size + 5} color={color} />
                        } else if (route.name === 'AdminAddDinnerTable') {
                            return <Entypo name="add-to-list" size={size + 5} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminListDinnerTable" component={AdminListDinnerTable} options={{ title: "Danh sách", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminAddDinnerTable" component={AdminAddDinnerTable} options={{ title: "Thêm", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    const AdminManageMenu = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'AdminListFood') {
                            return <FontAwesome5 name="hamburger" size={size + 5} color={color} />
                        } else if (route.name === 'AdminListDrink') {
                            return <FontAwesome5 name="coffee" size={size + 5} color={color} />
                        } else if (route.name === 'AdminBinMenu') {
                            return <FontAwesome5 name="trash" size={size + 5} color={color} />
                        } else if (route.name === 'AdminAddFoodMenu') {
                            return <Entypo name="add-to-list" size={size + 5} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminListFood" component={AdminListFood} options={{ title: "Thức ăn", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminListDrink" component={AdminListDrink} options={{ title: "Thức uống", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminBinMenu" component={AdminBinMenu} options={{ title: "Thùng rác", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminAddFoodMenu" component={AdminAddFoodMenu} options={{ title: "Thêm", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    const AdminWarehouseDrawer = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'AdminListWarehouse') {
                            return <FontAwesome5 name="warehouse" size={size + 5} color={color} />
                        } else if (route.name === 'AdminAddWareHouse') {
                            return <Entypo name="add-to-list" size={size + 5} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminListWarehouse" component={AdminListWarehouse} options={{ title: "Danh sách", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminAddWareHouse" component={AdminAddWareHouse} options={{ title: "Thêm", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    const AdminRevenueDrawer = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'AdminRevenueDay') {
                            return <FontAwesome5 name="dollar-sign" size={size + 5} color={color} />
                        } else if (route.name === 'AdminListDrink') {
                            return <AntDesign name="linechart" size={size+5} color={color} />
                        } else if (route.name === 'AdminBinMenu') {
                            return <FontAwesome name="bar-chart-o" size={size + 5} color={color} />
                        }
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="AdminRevenueDay" component={AdminRevenueDay} options={{ title: "Ngày", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminListDrink" component={AdminListDrink} options={{ title: "Tuần", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
                <Tab.Screen name="AdminBinMenu" component={AdminBinMenu} options={{ title: "Tháng", headerShown: false, tabBarLabelStyle: { fontSize: 14, marginBottom: 2 } }} />
            </Tab.Navigator>
        )
    }

    //home admin
    const HomeAdminDrawer = () => {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="HomeDrawer" component={HomeAdminTab} options={{ title: "Trang chủ quán", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="home" size={20} color="black" />) }} />
                <Drawer.Screen name="OrderCurrentTab" component={OrderCurrentTab} options={{ title: "Hóa đơn hiện tại", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="money-bill" size={20} color="black" />) }} />
                <Drawer.Screen name="AdminManageStaff" component={AdminManageStaff} options={{ title: "Quản lý nhân viên", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<Ionicons name="person" size={24} color="black" />) }} />
                <Drawer.Screen name="AdminManageDinnerTable" component={AdminManageDinnerTable} options={{ title: "Quản lý bàn ăn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="object-group" size={24} color="black" />) }} />
                <Drawer.Screen name="AdminManageMenu" component={AdminManageMenu} options={{ title: "Quản lý thực đơn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<MaterialIcons name="restaurant-menu" size={24} color="black" />) }} />
                <Drawer.Screen name="AdminWarehouseDrawer" component={AdminWarehouseDrawer} options={{ title: "Quản lý kho", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="warehouse" size={20} color="black" />) }} />
                <Drawer.Screen name="HistoryOrderDrawer" component={HistoryOrderTab} options={{ title: "Lịch sử hóa đơn", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="history" size={26} color="black" />) }} />
                <Drawer.Screen name="AdminRevenueDrawer" component={AdminRevenueDrawer} options={{ title: "Thống kê doanh thu", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: ({ focused, size, color }) => (<FontAwesome5 name="dollar-sign" size={28} color="black" />) }} />
                <Drawer.Screen name="WaiterChangePassword" component={WaiterChangePassword} options={{ title: "Đổi mật khẩu", headerStyle: { backgroundColor: '#ffcc66', }, headerTitleAlign: "center", drawerIcon: (focused, size, color) => (<MaterialCommunityIcons name="key-change" size={24} color="black" />) }} />
                <Drawer.Screen name="LogOut" component={LogOut} options={{ title: "Đăng xuất", headerShown: false, drawerIcon: ({ focused, size, color }) => (<Entypo name="log-out" size={24} color="black" />) }} />
            </Drawer.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="HomeAdmin" component={HomeAdminDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="HomeShipper" component={HomeShipperDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="HomeWaiter" component={HomeWaiterDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="HomeChef" component={HomeChefDrawer} options={{ headerShown: false }} />
                <Stack.Screen name="WaiterDetailOrder" component={WaiterDetailOrder} options={{ title: "Chi Tiết Hóa Đơn", headerStyle: { backgroundColor: '#ffcc66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterPayOrder" component={WaiterPayOrder} options={{ title: "Thanh Toán Hóa Đơn", headerStyle: { backgroundColor: '#99ff66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterAddOrder" component={WaiterAddOrder} options={{ title: "Lập Hóa Đơn", headerTitleAlign: "center" }} />
                <Stack.Screen name="WaiterCompleteFood" component={WaiterCompleteFood} options={{ title: "Hoàn Thành Món", headerTitleAlign: "center", headerStyle: { backgroundColor: '#0099ff' }, }} />
                <Stack.Screen name="WaiterEditOrder" component={WaiterEditOrder} options={{ title: "Cập Nhật Hóa Đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="ChefPayOrder" component={ChefPayOrder} options={{ title: "Chờ Thanh Toán", headerTitleAlign: "center", headerStyle: { backgroundColor: '#99ff66' } }} />
                <Stack.Screen name="ChefDetailOrder" component={ChefDetailOrder} options={{ title: "Chi Tiết Hóa Đơn", headerStyle: { backgroundColor: '#ffcc66' }, headerTitleAlign: "center" }} />
                <Stack.Screen name="ChefCompleteFood" component={ChefCompleteFood} options={{ title: "Hoàn Thành Món", headerTitleAlign: "center", headerStyle: { backgroundColor: '#0099ff' }, }} />
                <Stack.Screen name="ChefNotification" component={ChefNotification} options={{ title: "Thông Báo", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="ChefConfirmBookShip" component={ChefConfirmBookShip} options={{ title: "Xác Nhận Đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="ChefProcessBookShip" component={ChefProcessBookShip} options={{ title: "Hoàn Thành Món", headerTitleAlign: "center", headerStyle: { backgroundColor: '#0099ff' }, }} />
                <Stack.Screen name="ChefCompleteBookShip" component={ChefCompleteBookShip} options={{ title: "Chờ Giao", headerTitleAlign: "center", headerStyle: { backgroundColor: '#99ff66' }, }} />

                <Stack.Screen name="DetailOrder" component={DetailOrder} options={({ route }) => ({
                    title: "Hóa Đơn - " + route.params.orderId,
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: '#ffcc66' }
                })} />
                <Stack.Screen name="ChefChangeQuantityWarehouse" component={ChefChangeQuantityWarehouse} options={{ title: "Cập nhật số lượng", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />

                <Stack.Screen name="ShipperConfirm" component={ShipperConfirm} options={{ title: "Xác Nhận Đơn", headerTitleAlign: "center" }} />
                <Stack.Screen name="ShipperDetailBookShip" component={ShipperDetailBookShip} options={{ title: "Chi Tiết Đơn Hàng", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="ShipperEditBookShip" component={ShipperEditBookShip} options={{ title: "Cập Nhật Đơn Hàng", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="ShipperReceiveBookShip" component={ShipperReceiveBookShip} options={{ title: "Nhận Món", headerTitleAlign: "center", headerStyle: { backgroundColor: '#0099ff' }, }} />
                <Stack.Screen name="ShipperCompleteBookShip" component={ShipperCompleteBookShip} options={{ title: "Hoàn Thành Đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#99ff66' }, }} />
                <Stack.Screen name="ShipperDetailHistotyBookShip" component={ShipperDetailHistotyBookShip} options={{ title: "Chi Tiết Hóa Đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="AdminDetailOrder" component={AdminDetailOrder} options={{ title: "Chi Tiết Hóa Đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="AdminDetailHistotyBookShip" component={AdminDetailHistotyBookShip} options={{ title: "Chi Tiết Hóa Đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="AdminEditStaff" component={AdminEditStaff} options={{ title: "Cập nhật thông tin nhân viên", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="AdminEditDinnerTable" component={AdminEditDinnerTable} options={{ title: "Cập nhật thông tin bàn ăn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="AdminEditFoodMenu" component={AdminEditFoodMenu} options={{ title: "Cập nhật thông tin thực đơn", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />
                <Stack.Screen name="AdminEditWarehouse" component={AdminEditWarehouse} options={{ title: "Cập nhật thông tin sản phẩm", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />


                <Stack.Screen name="TestStack" component={Test} options={{ title: "Test nè", headerTitleAlign: "center", headerStyle: { backgroundColor: '#ffcc66' }, }} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}



export default Navigation;