
import * as React from 'react';
import { View, Image, Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import profile from './src/screen/profile';
import qlch from './src/screen/quanLyCuaHang';
import add from './src/screen/addCuaHang';
import editCH from './src/screen/editCH';

function HomeScreen(props) {
    const navigation = props.navigation;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style={{ width: 350, height: 300, marginBottom: 100 }}
                source={{ uri: 'https://c8.alamy.com/comp/TXNHCC/monitor-desktop-computer-logo-or-icon-illustration-TXNHCC.jpg' }}
            />

            <Pressable style={{ backgroundColor: '#CCCCCC', borderRadius: 8, width: 166, height: 50, alignItems: 'center', marginBottom: 150 }}
            >
                <Button title='Màn hình thông tin cá nhân'
                onPress={() => navigation.navigate('profile')}/>

            </Pressable>

            <Pressable style={{ backgroundColor: '#CCCCCC', borderRadius: 8, width: 180, height: 50, alignItems: 'center', marginBottom: 100 }}>
                <Button title='Màn hình quản lý cửa hàng'
                onPress={() => navigation.navigate('Quản lý cửa hàng')}/>
            </Pressable>
        </View>


    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="profile" component={profile} />
                <Stack.Screen name="Quản lý cửa hàng" component={qlch} />
                <Stack.Screen name="Thêm cửa hàng" component={add} />
                <Stack.Screen name="Sửa" component={editCH} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;