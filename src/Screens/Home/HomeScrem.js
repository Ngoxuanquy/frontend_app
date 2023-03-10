import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, Animated, Switch, Button, BackHandler, RefreshControl } from 'react-native';
import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker'

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DropDownItem from "react-native-drop-down-item";
import { Accordion, animate, Value } from '@dooboo-ui/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpAnh from '../../Components/UpAnh';
import LottieView from 'lottie-react-native';
// import MaHoa from '../Components/MaHoa';
import * as Keychain from 'react-native-keychain';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';

import { EventRegister } from 'react-native-event-listeners'
// import { Value } from 'react-native-reanimated';
// import Buttons from './Button'
import ThemeConText from '../../../config/themeConText';
import { BottomSheet, ListItem } from '@rneui/themed';
import { Entypo } from '@expo/vector-icons';
import Upload from '../../Components/Upload';
import { firebase } from '../../../config/config'


export default function HomeScrenn({ navigation }) {

    const theme = useContext(ThemeConText)

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const [taikhoan, setTaiKhoan] = useState([])
    const [token, setToken] = useState([])
    AsyncStorage.getItem('taikhoan')
        .then(res =>
            setTaiKhoan(res)
        )

    AsyncStorage.getItem('token')
        .then(res =>
            setToken(res)
        )


    const [token_test, setTokenTest] = useState()

    async function getToken() {

        const { status } = await Notifications.getPermissionsAsync()
        if (status !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            if (status !== 'granted') {
                alert('Looix')
                return;
            }
        }

        const tokenData = await Notifications.getExpoPushTokenAsync()
        const token = tokenData.data
        setTokenTest(token);
    }

    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/tokenthongbao/update/token/' + taikhoan, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // taikhoan: taikhoan,
                token: token_test,
            })
        })
    }, [token_test])


    getToken()


    const [isLoad, setIsLoad] = useState(false)
    const [isUpAnh, setUpAnh] = useState(false)

    const [thongtin, setThongTin] = useState([])
    const [reset, setReset] = useState(false);

    const [apis, setApi] = useState([])
    const [image, setImage] = useState(null)
    const [logins, setLogin] = useState([])

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const [animatedValue] = useState(new Animated.Value(0));
    const animate = () => {
        animate({
            animatedValue,
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    AsyncStorage.getItem('taikhoan')
        .then(res =>
            setTaiKhoan(res)
        )

    AsyncStorage.getItem('token')
        .then(res =>
            setToken(res)
        )

    // console.log(taikhoan)

    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/users/' + taikhoan)
            .then(res => res.json())
            .then(res => setThongTin(res))
    }, [taikhoan])

    const options = {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    }

    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/posts', options)
            .then(res => res.json())
            .then(res => setApi(res))
            .catch((err) => console.log(err))
    }, [token])

    function handerLogout() {
        navigation.replace('Login')
        fetch('http://192.168.1.165:4000' + '/api/users/update/token/' + taikhoan, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => {
                // navigation.replace('Login');
                setReset(true);
                setTimeout(() => {
                    setReset(false);
                }, 100);

                AsyncStorage.clear().then(() => {
                    setToken('')
                    setTaiKhoan('')
                    // console.log("taikhoan : " + taikhoan)

                }).catch((error) => {
                    console.log('AsyncStorage clear error: ', error);
                });

            })
    }

    if (reset) {
        return null;
    }

    const pickImage = async () => {
        // setIsLoad(true)

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        // console.log("image :" + image)

        if (!result.canceled) {
            const source = { uri: result.assets[0].uri }
            setImage(source)
        }
    }
    const [images, setImages] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [url, setUrl] = useState('')


    // const pickerImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         quality: 1,
    //     })

    //     const source = { uri: result.assets[0].uri }

    //     setImages(source)
    // }

    const uploadImage = async () => {
        // setUploading(true)
        const response = await fetch(image.uri)
        const blob = await response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)
        let refs = firebase.storage().ref().child(`image/${filename}`).put(blob)

        refs.then((a) => a.ref.getDownloadURL().then((url) => {
            console.log('out')
            update_img(url)

        }))

        try {
            await refs
        } catch (error) {
            console.log(error)
        }
        // setUploading(false)
        // Alert.alert('Photo uploaded')
        setImage(null)

    }

    const update_img = async (url) => {
        await fetch('http://192.168.1.165:4000' + '/api/users/update/img/' + taikhoan, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                img: url
            })
        })
            .then(() => {
                fetch('http://192.168.1.165:4000' + '/api/users/' + taikhoan)
                    .then(res => res.json())
                    .then(res => setThongTin(res))
            })
            .then(() => {
            })
    }


    function handerXacNhan() {
        setUpAnh(false)
        setIsVisible(false)
        uploadImage();
        alert('Thay ???nh Th??nh C??ng!!!')
        setImage(null)

    }

    const contents = [
        {
            title: "Th??? T???c H??nh Ch??nh",
            body: "Hi. I love this component. What do you think?"
        },
        {
            title: "????n H??ng",
            body: "Yes. You can have more items."
        },
        {
            title: "Kho H??ng",
            body: "hello"
        }
    ]


    const buttons = [
        {
            id: 1, button: 'Th??? T???c H??nh Ch??nh', icon: 'receipt', color: '#d3af92'
        },
        {
            id: 2, button: 'Ch??? S??? C?? Nh??n', icon: 'add-task', color: '#c7ade2'
        },
        {
            id: 3, button: 'Th??ng B??o C??ng Ty', icon: 'notifications', color: '#bcece0'
        },
        {
            id: 4, button: 'L????ng Th?????ng', icon: 'aspect-ratio', color: '#97eaa1'
        },
        {
            id: 5, button: 'L???ch S??? ????n H??ng', icon: 'history', color: '#afe073'
        },
        {
            id: 6, button: 'Duy???t Chi', icon: 'trending-up', color: '#eeef91'
        },
        {
            id: 7, button: 'Nh???p-Xu???t Kho', icon: 'compare-arrows', color: '#f3b9e9'
        },
        {
            id: 8, button: 'Kho H??ng C?? Nh??n', icon: 'account-balance', color: '#c096e9'
        },
        {
            id: 9, button: 'L???ch S??? Phi???u M?????n', icon: 'library-books', color: '#e9d196'
        },
    ]

    function handerUpAnh() {
        setUpAnh(true)
        setIsVisible(true)
        setImage(null)
    }

    function handerCance() {
        setUpAnh(false)
        setImage(null)

    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetch('http://192.168.1.165:4000' + '/api/users/')
                .then(res => res.json())
                .then(res => {
                    res.map(re => {
                        re.ChamCong.map(r => {
                            if (r.Email === taikhoan) {
                                setChamCong(re.ChamCong)
                            }
                            return;
                        })
                    })
                })

            fetch('http://192.168.1.165:4000' + '/api/lichsumuonhang/khachhang/' + taikhoan + '/Ch??a X??c Nh???n')
                .then(res => res.json())
                .then(res => setThongBao(res.length))
                .catch(err => console.log(err))


            setRefreshing(false);
        }, 1000);
    }, [chamcongs]);


    const [chamcongs, setChamCong] = useState([])

    const [check, setCheck] = useState('')
    const [giovao, setGioVao] = useState('')
    const [giora, setGioRa] = useState('')


    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/users/')
            .then(res => res.json())
            .then(res => {
                res.map(re => {
                    re.ChamCong.map(r => {
                        if (r.Email === taikhoan) {
                            setChamCong(re.ChamCong)
                        }
                        return;
                    })
                })
            })
            .finally(() => {

            })
    }, [taikhoan])

    const [thongbaos, setThongBao] = useState()

    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/lichsumuonhang/khachhang/' + taikhoan + '/Ch??a X??c Nh???n')
            .then(res => res.json())
            .then(res => setThongBao(res.length))
            .catch(err => console.log(err))
    }, [taikhoan])


    // console.log(chamcongs)
    // console.log(taikhoan)

    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/chamcong/')
            .then(res => res.json())
            .then(res => {
                res.map(re => {
                    if (re.Email === taikhoan) {
                        setCheck(re.date)
                    }
                    else {
                        setCheck('')
                        return;
                    }
                })
            }
            )
    }, [chamcongs])

    const [chieuvao, setChieuVao] = useState()
    const [chieura, setChieuRa] = useState()



    useEffect(() => {
        const a = new Date()
        chamcongs.map(chamcong => {
            if (check.slice(0, 2) == a.getDate() && check.slice(3, 5) == (a.getMonth() + 1) && check.slice(6, 10) == a.getFullYear()) {
                setGioVao(chamcong.sang_GioVao)
                return;
            }
        })

        chamcongs.map(chamcong => {
            if (check.slice(0, 2) == a.getDate() && check.slice(3, 5) == (a.getMonth() + 1) && check.slice(6, 10) == a.getFullYear()) {
                setGioRa(chamcong.sang_GioRa)
                return;

            }
        })
        chamcongs.map(chamcong => {
            if (check.slice(0, 2) == a.getDate() && check.slice(3, 5) == (a.getMonth() + 1) && check.slice(6, 10) == a.getFullYear()) {
                setChieuVao(chamcong.chieu_GioVao)
                return;

            }
        })
        chamcongs.map(chamcong => {
            if (check.slice(0, 2) == a.getDate() && check.slice(3, 5) == (a.getMonth() + 1) && check.slice(6, 10) == a.getFullYear()) {
                setChieuRa(chamcong.chieu_GioRa)
                return;

            }
        })
    })

    const [mode, setMode] = useState(false)

    const [isVisible, setIsVisible] = useState(false);
    const list = [
        { title: 'Up ???nh' },
        {
            title: 'UpDate',
            containerStyle: { backgroundColor: 'green' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),

        },

        {
            title: 'Cance',
            containerStyle: { backgroundColor: 'red', marginBottom: 20, },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    function handerXuLy(title) {
        if (title == 'Up ???nh') {
            pickImage();
        }
        else if (title == 'UpDate') {
            handerXacNhan();
        }
        else {
            setIsVisible(false)
        }
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{
                    tintColor: 'black',
                    backgroundColor: '#7a84f3',
                    size: 10,
                    marginBottom: 0,
                }} />
            }
        >
            <View style={[
                {
                }
                , {
                    backgroundColor: theme.maunen
                }]}
            >
                <View style={{
                    height: 420,
                    justifyCotent: 'center',
                    alignItems: 'center',
                    marginTop: -90,
                    width: "100%",
                    shadowColor: "#7a84f3",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 10.00,

                    elevation: 24,

                }}>
                    <LinearGradient
                        // Background Linear Gradient
                        start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                        colors={['#bf57f4', '#997af4', '#878bf5', '#7a84f3']}
                        style={{
                            width: "100%",
                            height: 4500,
                            flex: -1,
                            transform: [{ rotate: "285deg" }],
                            borderRadius: 90,
                        }}
                    >

                        <View style={{
                            backgroundGradient: "vertical",
                            backgroundGradientTop: "red",
                            backgroundGradientBottom: "blue",
                            width: '100%',
                            paddingTop: 120,
                            paddingLeft: 90,
                            paddingHorizontal: 30,
                            transform: [{ rotate: "-285deg" }],

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <TouchableOpacity
                                    onPress={() => setIsLoad(true)}
                                >
                                    <MaterialIcons name='menu'
                                        style={[
                                            {
                                                fontSize: 30,
                                                color: 'white',
                                            }
                                            , {
                                                color: theme.color
                                            }]}
                                    />
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        marginLeft: 20

                                    }}>
                                        {
                                            mode == true ?
                                                <TouchableOpacity
                                                    style={{
                                                        marginLeft: -40,
                                                        marginTop: 3
                                                    }}
                                                    onPress={() => {
                                                        setMode(false)
                                                        EventRegister.emit('changeTheme', false)

                                                    }}
                                                >
                                                    <Feather name="sun" size={24} color="black" style={{
                                                        color: theme.color
                                                    }} />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    style={{
                                                        marginLeft: -40,
                                                        marginTop: 3
                                                    }}
                                                    onPress={() => {
                                                        setMode(true)
                                                        EventRegister.emit('changeTheme', true)
                                                    }}

                                                >
                                                    <Entypo name="moon" size={24} color="black" style={{
                                                        color: theme.color
                                                    }} />
                                                </TouchableOpacity>
                                        }
                                    </View>
                                    {/* <Switch
                                        trackColor={{ false: '#81b0ff', true: '#767577' }}
                                        thumbColor={mode ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        style={{
                                            width: 50,
                                            height: 30,
                                            marginRight: 10
                                        }}
                                        value={mode}
                                        onValueChange={(value) => {
                                            setMode(value);
                                            EventRegister.emit('changeTheme', value)
                                        }
                                        }
                                    /> */}
                                    <View style={{
                                        flexDirection: 'row',
                                        position: 'relative',
                                        marginRight: -60,

                                    }}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Th??ng B??o C??ng Ty')}

                                        >
                                            <MaterialIcons name='notifications'
                                                style={[
                                                    {
                                                        fontSize: 30,
                                                        color: 'white',
                                                        marginRight: -60,
                                                        position: 'relative',
                                                    }
                                                    , {
                                                        color: theme.color
                                                    }]}
                                            >
                                            </MaterialIcons>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{
                                            position: 'absolute',
                                            right: -35,
                                            width: 15,
                                            height: 15,
                                            borderRadius: 100,
                                            backgroundColor: 'red',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            zIndex: -1,
                                        }}
                                        >
                                            <Text style={{
                                                textAlign: 'center',
                                                color: 'white'
                                            }}>
                                                {thongbaos}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginTop: 30,
                                flexDirection: 'row',
                                marginLeft: -10
                            }}>

                                {thongtin.map(thong => (
                                    <TouchableOpacity
                                        key={thong.id}
                                        onPress={() => handerUpAnh()}
                                    >
                                        {thong.img == "" ?
                                            <Image
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 200,
                                                }}
                                                source={{
                                                    uri: "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang.jpg"
                                                }}
                                            /> :
                                            <Image
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 200,
                                                }}
                                                source={{
                                                    uri: thong.img
                                                }}
                                            />
                                        }

                                    </TouchableOpacity>
                                ))}
                                <View>
                                    <Text style={[
                                        {
                                            fontSize: 20,
                                            marginLeft: 20,
                                            marginTop: 10,
                                            color: 'white'
                                        }
                                        , {
                                            color: theme.color
                                        }]}
                                    >
                                        {taikhoan}
                                    </Text>
                                    <Text
                                        style={[
                                            {
                                                fontSize: 14,
                                                marginLeft: 20,
                                                marginTop: 0,
                                                opacity: 0.6,
                                                color: 'white'
                                            }
                                            , {
                                                color: theme.color
                                            }]}
                                    >
                                        Nh??n Vi??n KT
                                    </Text>
                                </View>

                                <View style={{
                                    marginLeft: 26,
                                    marginTop: 10
                                }}>
                                    <TouchableOpacity
                                        style={[
                                            {
                                                backgroundColor: '#fff',
                                                padding: 10,
                                                borderRadius: 10,
                                                marginLeft: 30
                                            }
                                            , {
                                                backgroundColor: theme.background
                                            }]}
                                    >
                                        <Text style={[
                                            , {
                                                color: theme.color
                                            }]}>
                                            Chi Ti???t
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <BottomSheet modalProps={{}} isVisible={isVisible}>
                                {list.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        containerStyle={l.containerStyle}
                                        onPress={() => handerXuLy(l.title)}
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                ))}
                            </BottomSheet>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginTop: 20
                            }}>
                                <View style={{
                                }}>
                                    <Text
                                        style={[
                                            {
                                                fontSize: 16,
                                                color: 'white',
                                                marginRight: 70,
                                                marginLeft: 20
                                            }
                                            , {
                                                color: theme.color
                                            }]}
                                    >
                                        S??ng V??o: {giovao}
                                    </Text>
                                    <Text
                                        style={[
                                            {
                                                fontSize: 16,
                                                color: 'white',
                                                marginRight: 50,
                                                marginLeft: 20
                                            }
                                            , {
                                                color: theme.color
                                            }]}
                                    >
                                        S??ng Ra: {giora}
                                    </Text>
                                </View>
                                <View >
                                    <Text
                                        style={[
                                            {
                                                fontSize: 16,
                                                color: 'white',
                                                marginLeft: 30
                                            }
                                            , {
                                                color: theme.color
                                            }]}
                                    >
                                        Chi???u V??o: {chieuvao}
                                    </Text>
                                    <Text
                                        style={[
                                            {
                                                fontSize: 16,
                                                color: 'white',
                                                marginLeft: 30
                                            }
                                            , {
                                                color: theme.color
                                            }]}
                                    >
                                        Chi???u Ra: {chieura}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    {/* 
                    <View style={{
                        width: '100%',
                        height: 400,
                        backgroundColor: '#c25cea',
                        position: 'absolute',
                        marginTop: 0,
                        left: 15,
                        top: -100,
                        transform: [{ rotate: "285deg" }],
                        zIndex: -1,
                        borderRadius: 70,

                    }}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#e3c6ec', '#dfacef', '#bf4ae3', '#c02ded']}
                            style={{
                                width: "100%",
                                height: 1500,
                                position: 'relative',
                                flex: -1,
                                borderRadius: 70,
                                // zIndex: -1,
                                // marginTop: 100,
                                // marginLeft: 100

                            }}
                        ></LinearGradient>
                    </View> */}
                    {/* <Image
                        style={{
                            height: 100,
                            width: 100,
                            zIndex: 100,
                            backgroundColor: '#2851db',
                            marginLeft: 150,
                            top: -30
                        }}
                        source={{ uri: 'https://o.remove.bg/downloads/a6d924d0-f37c-475c-b34e-2bf66b54aa64/lovepik-boy-sitting-fishing-png-image_401745460_wh1200-removebg-preview.png' }}
                    /> */}
                </View>
                <View>
                    <View>
                        <Text
                            style={[
                                {
                                    fontSize: 25,
                                    marginTop: -10,
                                    padding: 10,
                                    marginBottom: 20
                                }
                                , {
                                    color: theme.color
                                }]}
                        >
                            Ph??m T???t
                        </Text>
                    </View>

                    <ScrollView horizontal>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',

                            }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#8fe8b1',
                                padding: 15,
                                borderRadius: 10,
                                width: 130,
                                marginLeft: 20,
                                marginRight: 20,

                            }}
                                onPress={() => navigation.navigate('KhoHang')}

                            >
                                <Text
                                    style={[
                                        {
                                            textAlign: 'center',
                                            fontSize: 20,
                                            color: 'white'
                                        }
                                        , {
                                            color: theme.color
                                        }]}
                                >
                                    Kho H??ng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#57a3f2',
                                padding: 15,
                                borderRadius: 10,
                                width: 130,
                                marginLeft: 0,
                                marginRight: 0,


                            }}
                                onPress={() => navigation.navigate('????n H??ng')}

                            >
                                <Text
                                    style={[
                                        {
                                            textAlign: 'center',
                                            fontSize: 20,
                                            color: 'white'
                                        }
                                        , {
                                            color: theme.color
                                        }]}
                                >
                                    ????n H??ng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#f5b785',
                                padding: 15,
                                borderRadius: 10,
                                width: 130,
                                marginLeft: 20,
                                marginRight: 0,



                            }}
                                onPress={() => navigation.navigate('QRCode')}

                            >
                                <Text
                                    style={[
                                        {
                                            textAlign: 'center',
                                            fontSize: 20,
                                            color: 'white'
                                        }
                                        , {
                                            color: theme.color
                                        }]}
                                >
                                    M?? QR
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                <View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            marginTop: 20
                        }}>
                            {buttons.map(button => (
                                <TouchableOpacity onPress={() => navigation.navigate(button.button)}
                                    key={button.id}
                                    style={{
                                        width: '45%',
                                        height: 145,
                                        backgroundColor: theme.background,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        marginTop: 20

                                    }}>
                                    <MaterialIcons name={button.icon} style={{
                                        fontSize: 50,
                                        color: button.color,
                                        marginBottom: 10,
                                        shadowColor: button.color,
                                        shadowOffset: {
                                            width: 0,
                                            height: 6,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 1.00,

                                        elevation: 10,

                                    }} />
                                    <Text
                                        style={[
                                            {
                                                textAlign: 'center',
                                                fontSize: 18,
                                                color: '#555555'
                                            }
                                            , {
                                                color: theme.color
                                            }]}
                                    >
                                        {button.button}
                                    </Text>
                                </TouchableOpacity>

                            ))}
                        </View>

                    </View>


                </View>

            </View >

            {
                isLoad &&

                <View style={{
                    width: '100%',
                    height: Dimensions.get('window').height,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    position: 'absolute',
                    zIndex: 10,
                    top: 0
                }}
                >
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: Dimensions.get('window').height,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            position: 'absolute',
                            zIndex: 10,
                            top: 0
                        }}
                        onPress={() => setIsLoad(false)}
                    >

                    </TouchableOpacity>
                </View>
            }



            {
                isLoad &&
                <View style={{
                    position: 'absolute',
                    height: Dimensions.get('window').height,
                    backgroundColor: 'white',
                    width: '80%',
                    zIndex: 110,


                }}>

                    <View style={{
                        zIndex: 100,
                        backgroundColor: '#0097d9',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 2.00,

                        elevation: 2,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 45,
                            marginBottom: 10,
                            justifyContent: 'space-between',
                        }}>
                            {thongtin.map(thong => (
                                <TouchableOpacity
                                    key={thong.id}
                                    onPress={() => handerUpAnh()}
                                >
                                    {thong.img == "" ?
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 120,
                                                borderRadius: 10,
                                            }}
                                            source={{
                                                uri: "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang.jpg"
                                            }}
                                        /> :
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 120,
                                                borderRadius: 10,
                                            }}
                                            source={{
                                                uri: thong.img
                                            }}
                                        />
                                    }

                                </TouchableOpacity>
                            ))}
                            <View style={{
                                paddingHorizontal: 10,
                                marginTop: 7,
                            }}>
                                <Text style={{
                                    lineHeight: 30,
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}>
                                    {taikhoan}
                                </Text>
                                <Text style={{
                                    lineHeight: 30,
                                    color: '#c9c9c9',
                                    fontSize: 16
                                }}>
                                    Nh??n Vi??n KT
                                </Text>
                                <Text style={{
                                    lineHeight: 30,
                                    color: '#c9c9c9',
                                    fontSize: 16
                                }}>
                                    B??c 100
                                </Text>
                            </View>
                        </View>

                    </View>


                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        <TouchableOpacity style={{
                            width: '90%',
                            height: 2,
                            backgroundColor: '#0097d9',
                            marginTop: 5
                        }}>

                        </TouchableOpacity>
                    </View>

                    <ScrollView style={[{}, {
                        backgroundColor: theme.background
                    }]}>
                        <View style={{
                            marginBottom: 100,


                        }}>
                            <View style={{
                                flexDirection: 'row',
                                // height: 40,
                                padding: 10,
                                paddingBottom: -10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.3,
                                marginLeft: 10,
                                marginRight: 10,
                                height: 60,
                                textAlign: 'center',
                                justifyContent: 'flex-start',
                                alignItems: 'center',

                            }}>
                                <MaterialIcons
                                    name="home"
                                    size={26}

                                    style={{
                                        // lineHeight: 30,
                                        // height: 40
                                        color: theme.color
                                    }}
                                />
                                <Text style={[{
                                    fontSize: 20,
                                    lineHeight: 30,
                                    marginLeft: 10

                                }, {
                                    color: theme.color
                                }]}>
                                    Trang Ch???
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                // height: 60,
                                padding: 10,
                                paddingBottom: -10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.3,
                                marginLeft: 10,
                                marginRight: 10,
                                height: 60,
                                textAlign: 'center',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <MaterialIcons
                                    name="notifications"
                                    size={26}
                                    color="black"
                                    style={{
                                        color: theme.color

                                    }}
                                />
                                <Text style={{
                                    fontSize: 20,
                                    lineHeight: 30,
                                    marginLeft: 10,
                                    color: theme.color,

                                }}>
                                    Th??ng B??o C??ng Ty
                                </Text>
                            </View>

                            <View style={{
                                // marginBottom: -100,
                                // height: 380
                                // transform: [{
                                //     scale: animatedValue
                                // }]
                            }}>
                                <ScrollView style={{ alignSelf: 'stretch', }}
                                    useNativeDriver={false}
                                >
                                    {
                                        contents
                                            ? contents.map((param, i) => {
                                                return (
                                                    <Accordion
                                                        style={{
                                                        }}
                                                        key={i}
                                                        useNativeDriver={true}
                                                        // style={styles.dropDownItem}
                                                        contentVisible={false}
                                                        // invisibleImage={IC_ARR_DOWN}
                                                        // visibleImage={IC_ARR_UP}
                                                        header={
                                                            <View style={{
                                                                marginLeft: 10,
                                                                marginRight: 10
                                                            }} >
                                                                <Animated.View style={{
                                                                    width: '100%',
                                                                    flexDirection: 'row',
                                                                    padding: 10,
                                                                    // height: 60,
                                                                    borderBottomColor: 'gray',
                                                                    borderBottomWidth: 0.3,
                                                                    // justifyContent: 'space-around'
                                                                }}
                                                                >
                                                                    <SimpleLineIcons name="handbag" size={24} color="black" style={{
                                                                        marginTop: -7,
                                                                        color: theme.color,
                                                                        // marginLeft: 10

                                                                    }} />
                                                                    {/* <Animated.View> */}

                                                                    <Text style={{
                                                                        fontSize: 20,
                                                                        color: 'black',
                                                                        // height: 0,
                                                                        marginLeft: 10,
                                                                        color: theme.color,

                                                                    }}
                                                                    // onPress={animateIn}
                                                                    >{param.title}</Text>

                                                                    {/* </Animated.View> */}

                                                                    <AntDesign name="down" size={16} color="black" style={{
                                                                        position: 'absolute',
                                                                        right: 10,
                                                                        top: 15,
                                                                        color: theme.color,
                                                                    }}
                                                                        onPress={animate}
                                                                    />

                                                                </Animated.View>
                                                            </View>
                                                        }
                                                    >

                                                        <View style={{

                                                        }}>
                                                            <Text style={[
                                                                styles.txt,

                                                                {
                                                                    fontSize: 20,
                                                                    color: theme.color,
                                                                }
                                                            ]}>
                                                                {param.body}
                                                            </Text>
                                                        </View>
                                                    </Accordion>
                                                );
                                            })
                                            : null
                                    }
                                    {/* <View style={{ height: 96 }} /> */}
                                </ScrollView>
                            </View>



                            <View style={{
                                flexDirection: 'row',
                                // height: 60,
                                padding: 10,
                                paddingBottom: -10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.3,
                                marginLeft: 10,
                                marginRight: 10,
                                height: 60,
                                textAlign: 'center',
                                justifyContent: 'flex-start',
                                alignItems: 'center'


                            }}>
                                <Feather name="book" size={24} color="black" style={{
                                    marginTop: -7,
                                    color: theme.color,
                                }} />
                                <Text style={{
                                    fontSize: 20,
                                    lineHeight: 30,
                                    marginLeft: 10,
                                    color: theme.color,

                                }}>
                                    X??c Nh???n B???ng L????ng
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                // height: 60,
                                padding: 10,
                                paddingBottom: -10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.3,
                                marginLeft: 10,
                                marginRight: 10,
                                height: 60,
                                textAlign: 'center',
                                justifyContent: 'flex-start',
                                alignItems: 'center'


                            }}>
                                <AntDesign name="linechart" size={24} color="black" style={{
                                    marginTop: -7,
                                    color: theme.color,
                                }} />
                                <Text style={{
                                    fontSize: 20,
                                    lineHeight: 30,
                                    marginLeft: 10,
                                    color: theme.color,

                                }}>
                                    Ch??? S??? C?? Nh??n
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                // height: 60,
                                padding: 10,
                                paddingBottom: -10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.3,
                                marginLeft: 10,
                                marginRight: 10,
                                height: 60,
                                textAlign: 'center',
                                justifyContent: 'flex-start',
                                alignItems: 'center'


                            }}>
                                <FontAwesome name="money" size={24} color="black" style={{
                                    marginTop: -7,
                                    color: theme.color,
                                }} />
                                <Text style={{
                                    fontSize: 20,
                                    lineHeight: 30,
                                    marginLeft: 10,
                                    color: theme.color,

                                }}>
                                    Duy???t Chi
                                </Text>
                            </View>


                            <View style={{
                                marginTop: 40
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    // height: 60,
                                    padding: 10,
                                    paddingBottom: -10,
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 0.3,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    height: 60,
                                    textAlign: 'center',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}
                                    onPress={() => handerLogout()}
                                >
                                    <MaterialIcons name="logout" size={30} color="black" style={{
                                        marginTop: -3,
                                        color: theme.color,
                                    }} />
                                    <Text style={{
                                        fontSize: 20,
                                        lineHeight: 30,
                                        marginLeft: 10,
                                        color: theme.color,

                                    }}>
                                        ????ng Xu???t
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View >

            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
