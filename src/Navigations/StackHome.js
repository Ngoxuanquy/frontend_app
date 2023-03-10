import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient';
import Home from '../Screens/Home/HomeScrem'
import QRCode from '../Screens/Home/QRCode'
import DonDangThucHien from '../Screens/DonHang/DonDangThucHien'
import KhoHang from './../Screens/Home/KhoHang'
import LichSuDonHang from './../Screens/Home/LichSuDonHang'
import Chart from '../Components/Char'
import ThongBao from '../Screens/ThongBao/ThongBao'
import LuongThuong from './../Screens/Home/LuongThuong'
import Cart_Them from '../Screens/Cart/Cart_Them'
import ChiSoCaNhan from '../Screens/ChiSoCaNhan/ChiSoCaNhan'
import ThuTucHanhChinh from '../Screens/Home/ThuTucHanhChinh'
import DonHang from '../Screens/Home/DonHang'
import XacNhanChiSo from '../Screens/ChiSoCaNhan/XacNhanChiSo'
import PhieuPhat from '../Screens/DonXin/PhieuPhat'
import PhieuDeNghi from '../Screens/DonXin/ThieuDeNghi'
import PhieuGiaiTrinh from '../Screens/DonXin/PhieuGiaiTrinh'
import DonXinNghiViec from '../Screens/DonXin/DonXinNghiViec'
import DonXinDiMuon from '../Screens/DonXin/DonXinDiMuon'
import XuatNhapKho from '../Screens/Home/XuatNhapKho'
import KhoHangCaNhan from '../Screens/ChiSoCaNhan/KhoHangCaNhan'
import PhieuMuon from '../Screens/NhapXuatKho/LichSuMuon'
import PhieuMuonHang from '../Screens/NhapXuatKho/PhieuMuonHang'
import PhieuXuatKho from '../Screens/NhapXuatKho/PhieuXuatKho'
import PhieuDoiHang from '../Screens/NhapXuatKho/PhieuDoiHang'
import PhieuCapDo from '../Screens/NhapXuatKho/PhieuCapDo'
import PhieuThuDo from '../Screens/NhapXuatKho/PhieuThuHoiDo'
import SuaThanhToan from '../Screens/Cart/SuaThanhToan'
import DonVeSinh from '../Screens/DonHang/DonViSinh'
import ChiTietThongBao from '../Screens/ThongBao/ChiTietThongBao'
import DonChoThucHien from '../Screens/DonHang/DonChoThucHien'
import DonDaHoanThanh from '../Screens/DonHang/DonHoanThanh'
import DonThuNo from '../Screens/DonHang/DonThuNo'
import DonKhachNo from '../Screens/DonHang/DonKhachNo'
import DonHoanThanh from '../Screens/DonHang/DonHoanThanh'
import DonChuaBanGiao from '../Screens/DonHang/DonChuaBanGiao'
import DonXinNghiPhep from '../Screens/DonXin/DonXinNghiPhep';
import DonXinPartTime from '../Screens/DonXin/DonXinPartTime';
import XemLaiChiTiet from './../Screens/ThongBao/XemLaiChiTiet';


const Stack = createNativeStackNavigator()

function StackHomes() {
    return (
        <Stack.Navigator
            options={{
                headerStyle: {
                    backgroundColor: '#262626',
                    height: 150,
                    // title: 'My home',
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="????n H??ng"
                component={DonHang}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="QRCode"
                component={QRCode}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DonDangThucHien"
                component={DonDangThucHien}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="KhoHang"
                component={KhoHang}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="L???ch S??? ????n H??ng"
                component={LichSuDonHang}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Duy???t Chi"
                component={Chart}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="L????ng Th?????ng"
                component={LuongThuong}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Th??ng B??o C??ng Ty"
                component={ThongBao}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Nh???p-Xu???t Kho"
                component={XuatNhapKho}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u M?????n H??ng"
                component={PhieuMuonHang}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u Xu???t Kho"
                component={PhieuXuatKho}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u ?????i H??ng"
                component={PhieuDoiHang}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u C???p ?????"
                component={PhieuCapDo}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u Thu H???i ?????"
                component={PhieuThuDo}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />

            <Stack.Screen
                name="Kho H??ng C?? Nh??n"
                component={KhoHangCaNhan}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="L???ch S??? Phi???u M?????n"
                component={PhieuMuon}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="DonHang"
                component={Cart_Them}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="Th??? T???c H??nh Ch??nh"
                component={ThuTucHanhChinh}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Ch??? S??? C?? Nh??n"
                component={ChiSoCaNhan}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Chi Ti???t ????n"
                component={SuaThanhToan}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="X??c Nh???n Ch??? S???"
                component={XacNhanChiSo}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u Ph???t"
                component={PhieuPhat}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u ????? Ngh???"
                component={PhieuDeNghi}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Phi???u Gi???i Tr??nh"
                component={PhieuGiaiTrinh}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n Xin Ngh??? Ph??p"
                component={DonXinNghiPhep}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n Xin Ngh??? Vi???c"
                component={DonXinNghiViec}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n Xin ??i Mu???n"
                component={DonXinDiMuon}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n V??? Sinh"
                component={DonVeSinh}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />

            <Stack.Screen
                name="Chi Ti???t Th??ng B??o"
                component={ChiTietThongBao}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />

            <Stack.Screen
                name="????n Thu N???"
                component={DonThuNo}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n ???? Ho??n Th??nh"
                component={DonDaHoanThanh}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n Kh??ch N???"
                component={DonKhachNo}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n Ch??? Th???c Hi???n"
                component={DonChoThucHien}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#262626',
                        backgroundColor: "linear-gradient(-90deg, purple, pink)",
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n Hoa??n Tha??nh"
                component={DonHoanThanh}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="????n Ch??a B??n Giao"
                component={DonChuaBanGiao}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />

            <Stack.Screen
                name="????n Xin ngh??? ph??p"
                component={DonXinNghiPhep}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />


            <Stack.Screen
                name="????n Xin Part Time"
                component={DonXinPartTime}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />

            <Stack.Screen
                name="Xem L???i Chi Ti???t"
                component={XemLaiChiTiet}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#262626',
                        height: 150,
                        // title: 'My home',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    )
}

export default StackHomes