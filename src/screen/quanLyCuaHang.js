import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, Image, Button, FlatList, Pressable } from "react-native";
import { API_USER } from "./api";

export default function qlch(props) {
    const navigation = props.navigation;

    // useIsFocused là hook mà react-navigation tạo ra
    // để giúp lắng nghe việc màn hình được hiển thị
    const isFocused = useIsFocused();
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getList = () => {
        fetch(API_USER)
            .then((res) => res.json())
            .then((data) => {
                setList(data);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getList();
        // effect sẽ chạy lần đầu tiên và khi màn hình được vào bằng react-navigation
    }, [isFocused]);

    const onDelete = (deleteId) => {
        fetch(API_USER + '/' + deleteId, { method: 'DELETE' })
            .then((res) => getList())
            .catch((err) => console.log(err));
    }

    const onEdit = (editId) => {
        fetch(API_USER + '/' + editId)
            .then(res => res.json())
            .then(data => props.navigation.navigate('Sửa', { editItem: data }));

    }

    return (
        <View>

            <View style={{ width: 150, marginLeft: 170, marginTop: 10, marginBottom: 10 }}>
                <Button
                    title="Thêm mới"
                    onPress={() => props.navigation.navigate('Thêm cửa hàng')} />
            </View>

            <View>
                {
                    isLoading
                        ? <Text>Loading...</Text>
                        : <FlatList
                            data={list}
                            renderItem={({ item }) => <View style={{ alignItems: 'center', width: 450, marginLeft: 14, borderWidth: 1, borderRadius: 8, marginBottom: 10 }}>
                                <Text style={{ fontSize: 30 }}>
                                    {item.name}
                                </Text>
                                <Text style={{ fontSize: 30 }}>
                                    {item.address}
                                </Text>
                                <Text style={{ fontSize: 30 }}>
                                    {item.numberPhone}
                                </Text>
                                <Text style={{ fontSize: 30 }}>
                                    {item.status}
                                </Text>
                                <Pressable onPress={() => onEdit(item.id)}>
                                    <Text>Edit</Text>
                                </Pressable>
                                <Pressable onPress={() => onDelete(item.id)}>
                                    <Text>DELETE</Text>
                                </Pressable>
                            </View>}
                            keyExtractor={(item, index) => index}
                        />
                }
            </View>

        </View>
    );
}