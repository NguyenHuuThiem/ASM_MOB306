import { View, Text, Image, Button, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { API_USER } from "./api";

export default function editCH(props){

    const editItem = props.route.paramas?.editItem;
    const navigation = props.navigation;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (editItem) {
            setName(editItem.name);
            setAddress(editItem.address);
            setNumberPhone(editItem.numberPhone);
            setStatus(editItem.status + '');

        }
    },[editItem?.id])

    const onSave = () => {
        // 1. Định nghĩa obj dùng để lưu bản ghi mới
        const newObj = {
            name: name,
            address: address,
            numberPhone: numberPhone,
            status: status
        };

        // 2. Call API để lưu bản ghi
        fetch(
            !editItem?.id ? API_USER : (API_USER + '/' + editItem.id),
            {
                // cấu hình đính kèm khi gửi yêu cầu để đảm bảo
                // phía server tiếp nhận được dữ liệu json
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                // phương thức gửi khi tạo mới là POST
                method: !editItem?.id ? 'POST' : 'PUT',
                // dữ liệu khi tạo mới được ép về dạng chuỗi json
                body: JSON.stringify(newObj)
            }
        ).then(res => props.navigation.goBack())
            .catch((err) => console.log(err));
    }


    return (
        <View>
            <Text style={{ fontSize: 30, marginLeft: 140 }}>Màn hình sửa</Text>

            <View style={{ width: 100, marginTop: 20, marginLeft: 10 }}>
                <Button
                    title="Chọn ảnh"
                />
            </View>

            <TextInput
                style={{ marginTop: 30, borderWidth: 0.5, padding: 7 }}
                placeholder='Tên'
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={{ marginTop: 30, borderWidth: 0.5, padding: 7 }}
                placeholder='Địa chỉ'
                onChangeText={(text) => setAddress(text)}
            />
            <TextInput
                style={{ marginTop: 30, borderWidth: 0.5, padding: 7 }}
                placeholder='Số điện thoại'
                onChangeText={(text) => setNumberPhone(text)} />
            <TextInput
                style={{ marginTop: 30, borderWidth: 0.5, padding: 7 }}
                placeholder='Trạng thái'
                onChangeText={(text) => setStatus(text)} />

            <View style={{ width: 100, marginTop: 50, marginLeft: 200 }}>
                <Button
                    title="Thêm"
                    onPress={() => onSave()} />
            </View>

            <View style={{ width: 100, marginTop: 50, marginLeft: 200 }}>
                <Button
                    title="Hủy"
                    onPress={() => navigation.navigate("Quản lý cửa hàng")} />
            </View>
        </View>
    );
}