import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Button,
    Dialog,
    CheckBox,
    ListItem,
    Avatar,
} from '@rneui/themed';
import ThemeConText from '../../../config/themeConText';

export default function PhieuXuatKho({ navigation }) {

    const theme = useContext(ThemeConText)
    const [taikhoan, setTaiKhoan] = useState([])

    const [sanphams, setSanPham] = useState([])
    const [khotongs, setKhoTong] = useState([])
    const [sanphamthieu, setSanPhamThieu] = useState([])
    const [sanphamthua, setSanPhamThua] = useState([])
    const [id, setId] = useState()
    const [chitietsanphams, setChiTiet] = useState([])
    const [chitietkhachhangs, setChiTietKhachHang] = useState([])
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [loading3, setLoading3] = useState(true)
    const [loading4, setLoading4] = useState(true)


    const toggleDialog4 = (id) => {

        sanphams.map(sanpham => {
            if (sanpham.id == id) {
                setChiTiet(sanpham.transaction_lines)
            }
        })

        sanphams.map(sanpham => {
            if (sanpham.id == id) {
                setChiTietKhachHang(sanpham.customer_history)
            }
        })


        setVisible4(!visible4);
    };



    const [visible4, setVisible4] = useState(false);

    AsyncStorage.getItem('taikhoan')
        .then(res =>
            setTaiKhoan(res)
        )


    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/thanhtoan/NguoiLam/' + taikhoan)
            .then(res => res.json())
            .then(res => setSanPham(res))
            .catch(err => console.log(err))
            .finally(() => {
                setLoading1(false)
            })
    }, [taikhoan])



    const [apis, setApi] = useState([])
    const [id_users, setId_users] = useState('')
    AsyncStorage.getItem('id_users')
        .then(res =>
            setId_users(res)
        )

    const [khocanhans, setKhoCaNhan] = useState([])


    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/inventory/userID/' + id_users)
            .then(res => res.json())
            .then(res => setKhoCaNhan(res))
            .catch(err => console.log(err))
            .finally(() => {
            })
    }, [id_users])


    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/khotong/')
            .then(res => res.json())
            .then(res => setKhoTong(res))
            .catch(err => console.log(err))
    }, [taikhoan])


    useEffect(() => {

        khocanhans.map(khocanhan => {
            if (khocanhan.exist > khocanhan.tieu_chuan) {
                setSanPhamThua(pre => [...pre, khocanhan])
                setCanTra(false)

            }
            else if (khocanhan.exist < khocanhan.tieu_chuan) {
                setSanPhamThieu(pre => [...pre, khocanhan])
                setCanCap(false)


            }
        })

    }, [khocanhans])


    // useEffect(() => {
    //     console.log(id)


    //     fetch('http://192.168.1.165:4000' + '/api/khocanhan/user_id/' + 1)
    //         .then(res => res.json())
    //         .then(res => res.map(re => {
    //             if (re.SoLuong > re.TieuChuan) {
    //                 setSanPhamThua(re)
    //             }
    //         }))
    //         .catch((err) => console.log(err))
    // }, [id])

    const buttons = [
        { id: 0, button: 'SP ???? L??m' },
        { id: 1, button: 'SP C???n C???p' },
        { id: 2, button: 'SP C???n Tr???' },
        { id: 3, button: 'L???ch S??? Xu???t H??ng' },

    ]

    const [isloadDaLam, setDaLam] = useState(true)
    const [isloadCanCap, setCanCap] = useState(false)
    const [isloadCanTra, setCanTra] = useState(false)
    const [isloadLichSu, setLichSu] = useState(false)
    const [cliedId, setCliedID] = useState(0);


    const handerChon = (value, id) => {
        setCliedID(id);

        if (value == "SP ???? L??m") {
            setCanCap(false)
            setCanTra(false)
            setDaLam(true)
            setLichSu(false)
        }
        else if (value == "SP C???n Tr???") {
            setCanCap(false)
            setCanTra(true)
            setDaLam(false)
            setLichSu(false)

        }
        else if (value == "SP C???n C???p") {
            setCanCap(true)
            setCanTra(false)
            setDaLam(false)
            setLichSu(false)

        }
        else if (value == "L???ch S??? Xu???t H??ng") {
            setCanCap(false)
            setCanTra(false)
            setDaLam(false)
            setLichSu(true)

        }
    }

    const [tests, setTest] = useState("")
    const [lichsuxuathangs, setLichSuXuatHang] = useState([])


    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/lichsuxuathang/email/' + taikhoan)
            .then(res => res.json())
            .then(res => setLichSuXuatHang(res))
            .catch(err => console.log(err))
            .finally(() => {
                setLoading4(false)
            })
    }, [taikhoan])



    function handerSubmit() {

        const test = lichsuxuathangs.find(lichsuxuathang => lichsuxuathang.TrangThai === "Ch??a X??c Nh???n")

        if (test) return alert('????n Xu???t H??ng V?? Ch??a ???????c X??c Nh???n!!');

        fetch('http://192.168.1.165:4000' + '/api/lichsuxuathang/create/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: taikhoan,
            })
        })
            .then((
                fetch('http://192.168.1.165:4000' + '/api/lichsuxuathang/')
                    .then(res => res.json())
                    .then(res => {
                        let max_val = res.reduce(function (accumulator, element) {
                            return (accumulator.id > element.id) ? accumulator.id : element.id
                        });
                        sanphamthieu.map(sanphamthie => {
                            fetch('http://192.168.1.165:4000' + '/api/xuathang/create/', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    name: taikhoan,
                                    tenhang: String(sanphamthie.productsId),
                                    id: Number(max_val + 1),
                                    soluong: sanphamthie.tieu_chuan - sanphamthie.exist,
                                    price: 1
                                })
                            })
                                .then(() => {
                                    sanphamthua.map(sanphamthu => {
                                        fetch('http://192.168.1.165:4000' + '/api/xuathang/create/', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                name: taikhoan,
                                                tenhang: String(sanphamthie.productsId),
                                                id: Number(max_val + 1),
                                                soluong: sanphamthu.tieu_chuan - sanphamthu.exist,
                                                price: 1
                                            })
                                        })
                                            .catch(err => {
                                                console.log(err)
                                            })
                                    })
                                })
                                .then(() => {
                                    fetch('http://192.168.1.165:4000' + '/api/lichsuxuathang/email/' + taikhoan)
                                        .then(res => res.json())
                                        .then(res => setLichSuXuatHang(res))
                                        .catch(err => console.log(err))
                                        .finally(() => {
                                            setLoading4(false)
                                        })
                                })

                        })



                    })
                    .then(() => {
                        fetch('http://192.168.1.165:4000' + '/api/lichsuxuathang/email/' + taikhoan)
                            .then(res => res.json())
                            .then(res => setLichSuXuatHang(res))
                            .catch(err => console.log(err))
                            .finally(() => {
                                setLoading4(false)
                            })
                    })
            ))
            .then(() => {
                fetch('http://192.168.1.165:4000' + '/api/lichsuxuathang/email/' + taikhoan)
                    .then(res => res.json())
                    .then(res => setLichSuXuatHang(res))
                    .catch(err => console.log(err))
                    .finally(() => {
                        setLoading4(false)
                    })
            })

    }

    const [xuathangs, setXuatHang] = useState([])
    const [visible5, setVisible5] = useState(false);


    const toggleDialog5 = (id) => {
        lichsuxuathangs.map(lichsuxuathang => {
            if (lichsuxuathang.id == id) {
                setXuatHang(lichsuxuathang.xuathang)
            }
        })
        setVisible5(!visible5);
    };




    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.maunen }]}>
            <View>
                {/* Kho Toongr */}
                <View>
                    <View>
                        <View>
                            <Text style={{
                                padding: 10,
                                fontSize: 20,
                                color: theme.color
                            }}>
                                S???n Ph???m ???? ??i L??m
                            </Text>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 5,
                            borderWidth: 0.4,
                            borderColor: 'gray',
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    M?? H??a ????n
                                </Text>
                            </View>
                            <View style={{
                                width: '30%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    ????n Gi??
                                </Text>
                            </View>
                            <View style={{
                                width: '30%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    Tr???ng Th??i
                                </Text>
                            </View>


                        </View>

                        <View style={{

                            // paddingVertical: 10
                        }}>
                            {sanphams.map(sanpham => (
                                <View
                                    key={sanpham.id}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // borderWidth: 0.4,
                                        // borderColor: 'gray',
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 1,
                                        paddingVertical: 6

                                    }}>
                                    <View style={{
                                        width: '40%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            color: theme.color

                                        }}>
                                            {sanpham.code_bill}
                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '30%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            textAlign: 'center',
                                            color: theme.color

                                        }}>
                                            {sanpham.total_amount_after_discount}

                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '30%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Button
                                            title="Xem Chi Ti???t"
                                            onPress={() => toggleDialog4(sanpham.id)}
                                            buttonStyle={[styles.button]}
                                        />
                                        <Dialog
                                            isVisible={visible4}
                                            onBackdropPress={toggleDialog4}

                                        >
                                            <Dialog.Title title="Chi Ti???t S???n Ph???m" />
                                            <View >
                                                <View>
                                                    {chitietkhachhangs.map(chitietkhachhang => (
                                                        <View key={chitietkhachhang.id}>
                                                            <Text style={{
                                                                // color: theme.color

                                                            }}>
                                                                Kh??ch H??ng:   {chitietkhachhang.name}
                                                            </Text>
                                                            <Text style={{
                                                                // color: theme.color

                                                            }}>
                                                                Ng?????i L??m: {chitietkhachhang.Author_email}
                                                            </Text>
                                                            <Text style={{
                                                                // color: theme.color
                                                            }}>
                                                                Tr???ng Th??i: {chitietkhachhang.status}
                                                            </Text>
                                                            <Text style={{
                                                                // color: theme.color
                                                            }}>
                                                                ??i???n Tho???i: {chitietkhachhang.Number}
                                                            </Text>
                                                            <Text style={{
                                                                // color: theme.color
                                                            }}>
                                                                ?????a Ch???: {chitietkhachhang.Address}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                                <View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-around',
                                                        borderColor: 'gray',
                                                        paddingVertical: 10
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 17,
                                                            fontWeight: 'bold',
                                                            // color: theme.color

                                                        }}>
                                                            T??n SP
                                                        </Text>
                                                        <Text style={{
                                                            fontSize: 17,
                                                            fontWeight: 'bold',
                                                            // color: theme.color

                                                        }}>
                                                            ????n Gi??
                                                        </Text>
                                                        <Text style={{
                                                            fontSize: 17,
                                                            fontWeight: 'bold',
                                                            // color: theme.color

                                                        }}>
                                                            SL
                                                        </Text>
                                                    </View>
                                                    {chitietsanphams.map(chitietsanpham => (
                                                        <View key={chitietsanpham.id}>

                                                            <View style={{

                                                                // paddingVertical: 10
                                                            }}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-around',
                                                                    // borderWidth: 0.4,
                                                                    // borderColor: 'gray',
                                                                    borderBottomColor: 'gray',
                                                                    borderBottomWidth: 1,
                                                                    paddingVertical: 6,

                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 16,
                                                                        lineHeight: 30,
                                                                        // color: theme.color

                                                                    }}>
                                                                        {chitietsanpham.name}
                                                                    </Text>
                                                                    <Text style={{
                                                                        fontSize: 16,
                                                                        lineHeight: 30,
                                                                        // color: theme.color
                                                                        color: 'black'
                                                                    }}>
                                                                        {chitietsanpham.price}
                                                                    </Text>
                                                                    <Text style={{
                                                                        fontSize: 16,
                                                                        lineHeight: 30,
                                                                        // color: theme.color

                                                                    }}>
                                                                        {chitietsanpham.number_of}
                                                                    </Text>
                                                                </View>


                                                            </View>

                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        </Dialog>
                                    </View>

                                </View>

                            ))}
                        </View>
                    </View>

                </View>



                {/* Kho Ca Nhan */}

                <>
                    {/* {loading2 ? <ActivityIndicator /> : */}
                    <View>
                        <View>
                            <Text style={{
                                padding: 10,
                                fontSize: 20,
                                color: theme.color

                            }}>
                                S??? S???n Ph???m C???n C???p
                            </Text>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 5,
                            borderWidth: 0.4,
                            borderColor: 'gray',
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: '30%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    T??n S???n Ph???m
                                </Text>
                            </View>

                            <View style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    SL C??n
                                </Text>
                            </View>

                            <View style={{
                                width: '15%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    Ti??u Chu???n
                                </Text>
                            </View>

                            <View style={{
                                width: '15%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    Tr???ng Th??i
                                </Text>
                            </View>
                        </View>

                        <View style={{

                            // paddingVertical: 10
                        }}>
                            {sanphamthieu.map(sanpham => (
                                <View
                                    key={sanpham.id}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // borderWidth: 0.4,
                                        // borderColor: 'gray',
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 1,
                                        paddingVertical: 6

                                    }}>
                                    <View style={{
                                        width: '30%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            color: theme.color

                                        }}>
                                            {sanpham.productsId}
                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '10%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            textAlign: 'center',
                                            color: theme.color

                                        }}>
                                            {sanpham.exist}

                                        </Text>
                                    </View>


                                    <View style={{
                                        width: '15%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            textAlign: 'center',
                                            color: theme.color

                                        }}>
                                            {sanpham.tieu_chuan}

                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '15%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {sanpham.exist < sanpham.tieu_chuan ?
                                            <Text style={{
                                                fontSize: 16,
                                                lineHeight: 30,
                                                textAlign: 'center',
                                                color: 'green',

                                            }}>
                                                C???p

                                            </Text>
                                            :
                                            <Text style={{
                                                fontSize: 16,
                                                lineHeight: 30,
                                                textAlign: 'center',
                                                color: 'red'
                                            }}>
                                                Th???a

                                            </Text>
                                        }
                                    </View>
                                </View>

                            ))}
                        </View>
                    </View>
                    {/* } */}
                </>



                <>
                    {/* {loading3 ? <ActivityIndicator /> : */}
                    <View>
                        <View>
                            <Text style={{
                                padding: 10,
                                fontSize: 20,
                                color: theme.color

                            }}>
                                S??? S???n Ph???m C???n Tr???
                            </Text>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 5,
                            borderWidth: 0.4,
                            borderColor: 'gray',
                            paddingVertical: 10
                        }}>
                            <View style={{
                                width: '30%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    T??n S???n Ph???m
                                </Text>
                            </View>
                            <View style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    ????n Gi??
                                </Text>
                            </View>
                            <View style={{
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    SL C??n
                                </Text>
                            </View>

                            <View style={{
                                width: '15%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    Ti??u Chu???n
                                </Text>
                            </View>

                            <View style={{
                                width: '15%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    Tr???ng Th??i
                                </Text>
                            </View>
                        </View>

                        <View style={{

                            // paddingVertical: 10
                        }}>
                            {sanphamthua.map(sanpham => (
                                <View
                                    key={sanpham.id}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // borderWidth: 0.4,
                                        // borderColor: 'gray',
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 1,
                                        paddingVertical: 6

                                    }}>
                                    <View style={{
                                        width: '30%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            color: theme.color

                                        }}>
                                            {sanpham.productsId}
                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '10%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            textAlign: 'center',
                                            color: theme.color

                                        }}>
                                            {sanpham.price}

                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '10%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            textAlign: 'center',
                                            color: theme.color


                                        }}>
                                            {sanpham.exist}

                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '15%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            lineHeight: 30,
                                            textAlign: 'center',
                                            color: theme.color
                                        }}>
                                            {sanpham.tieu_chuan}

                                        </Text>
                                    </View>

                                    <View style={{
                                        width: '15%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {sanpham.SoLuong < sanpham.TieuChuan ?
                                            <Text style={{
                                                fontSize: 16,
                                                lineHeight: 30,
                                                textAlign: 'center',
                                                color: 'green'
                                            }}>
                                                C???p

                                            </Text>
                                            :
                                            <Text style={{
                                                fontSize: 16,
                                                lineHeight: 30,
                                                textAlign: 'center',
                                                color: 'red'
                                            }}>
                                                Th???a

                                            </Text>
                                        }
                                    </View>
                                </View>

                            ))}
                        </View>
                    </View>
                    {/* } */}
                </>

                <>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            padding: 10,
                            color: theme.color

                        }}>
                            Lich S??? ????n H??ng
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 5,
                            borderWidth: 0.4,
                            borderColor: 'gray',
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: theme.color

                            }}>
                                T??n
                            </Text>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: theme.color

                            }}>
                                Ng??y
                            </Text>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: theme.color

                            }}>
                                Tr???ng Th??i
                            </Text>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: theme.color

                            }}>
                                Chi Ti???t
                            </Text>
                        </View>
                        {
                            lichsuxuathangs.map(lichsuxuathang => (
                                <View key={lichsuxuathang.id} style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginBottom: 5,
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 0.4,
                                    paddingVertical: 10
                                }}>
                                    <Text style={{
                                        color: theme.color

                                    }}>
                                        {lichsuxuathang.Name}
                                    </Text>
                                    <Text style={{
                                        color: theme.color

                                    }}>
                                        {lichsuxuathang.date}
                                    </Text>
                                    {
                                        lichsuxuathang.TrangThai == "Ch??a X??c Nh???n" ?
                                            <Text style={{
                                                color: 'red',
                                                opacity: 0.7
                                            }}>
                                                {lichsuxuathang.TrangThai}
                                            </Text>
                                            :
                                            <Text style={{
                                                color: 'green',
                                                opacity: 0.7
                                            }}>
                                                {lichsuxuathang.TrangThai}
                                            </Text>
                                    }
                                    <Button
                                        title="Chi Ti???t"
                                        onPress={() => toggleDialog5(lichsuxuathang.id)}
                                        buttonStyle={styles.button}
                                    />
                                    <Dialog
                                        isVisible={visible5}
                                        onBackdropPress={toggleDialog5}
                                    >
                                        <Dialog.Title title="Chi Ti???t S???n Ph???m" />
                                        <View>
                                            <Text style={{
                                                fontSize: 16,
                                                color: 'red',
                                                opacity: 0.7
                                            }}>
                                                Ch?? Th??ch:
                                            </Text>
                                            <View>
                                                <Text>
                                                    D????ng l?? s??? h??ng ??c C???p
                                                </Text>
                                            </View>
                                            <View>
                                                <Text>
                                                    ??m l?? s??? h??ng ph???i tr???
                                                </Text>
                                            </View>
                                            <View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    borderColor: 'gray',
                                                    paddingVertical: 10
                                                }}>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        T??n SP
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        ????n Gi??
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 17,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        SL C???p - Thu
                                                    </Text>
                                                </View>
                                                {xuathangs.map(xuathang => (
                                                    <View key={xuathang.id}>

                                                        <View style={{

                                                            // paddingVertical: 10
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-around',
                                                                // borderWidth: 0.4,
                                                                // borderColor: 'gray',
                                                                borderBottomColor: 'gray',
                                                                borderBottomWidth: 1,
                                                                paddingVertical: 6

                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    lineHeight: 30
                                                                }}>
                                                                    {xuathang.TenHang}
                                                                </Text>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    lineHeight: 30
                                                                }}>
                                                                    {xuathang.price}
                                                                </Text>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    lineHeight: 30
                                                                }}>
                                                                    {xuathang.SoLuong}
                                                                </Text>
                                                            </View>


                                                        </View>

                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </Dialog>
                                </View>


                            ))
                        }
                    </View>
                </>


                <View style={{
                    marginLeft: 40,
                    marginTop: 20,
                    marginBottom: 30
                }}>
                    <TouchableOpacity style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        width: 100,
                        padding: 7,
                        backgroundColor: 'green',
                        borderRadius: 4
                    }}
                        onPress={() => handerSubmit()}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            G???i Y??u C???u
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

    butonUn: {
        // backgroundColor: 'gray',
        width: 110,
        height: 50,
        // marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#DDDDDD',
        // borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 2.27,
        elevation: 10,
        borderRadius: 100,
        marginLeft: 10

    },
    buttonAction: {
        backgroundColor: '#CC3333',
        width: 120,
        height: 50,
        // marginTop: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // borderRadius: 10,
        color: 'gold',
        fontWeight: 'bold',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 10,
        borderRadius: 100,
        marginLeft: 10

    }
});
