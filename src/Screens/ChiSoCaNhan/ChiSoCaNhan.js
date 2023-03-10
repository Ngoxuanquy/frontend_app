import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { FontAwesome5 } from '@expo/vector-icons';
import ThemeConText from '../../../config/themeConText';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function ChiSoCaNhan({ navigation }) {

    const luong = useRef();
    const theme = useContext(ThemeConText)

    function handlePress(event) {
        console.log(event.target.value);
    }

    const [apis, setAPi] = useState([])
    const [taikhoan, setTaiKhoan] = useState([])
    const [token, setToken] = useState([])
    AsyncStorage.getItem('taikhoan')
        .then(res =>
            setTaiKhoan(res)
        )

    const [ngaycong, setNgayCong] = useState()
    const [luongs, setLuong] = useState()

    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/chisocanhan/email/' + taikhoan)
            .then(res => res.json())
            .then(res => {
                setAPi(res)
                setNgayCong(res[0].ngay_cong)
                setLuong(res[0].luong_tam_tinh)
            })
            .catch((err) => console.log(err))
    }, [taikhoan])

    const [luongtamtinhs, setLuongTamTinh] = useState()

    useEffect(() => {
        fetch('http://192.168.1.165:4000' + '/api/chisocanhan/email/' + taikhoan)
            .then(res => res.json())
            .then(res =>
                setLuongTamTinh(res[0].gia_tri_TB_hien_tai)
            )
            .catch((err) => console.log(err))

    }, [taikhoan])


    // console.log(luongtamtinhs)

    const textRef = useRef(null);


    function handerSubmit() {
        if (luongtamtinhs > 200 && luongtamtinhs < 300) {
            fetch('http://192.168.1.165:4000' + '/api/chisocanhan/update/luong/' + taikhoan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    luong: 20000
                })
            })
        }
        else if (luongtamtinhs > 1000 && luongtamtinhs < 2000) {
            fetch('http://192.168.1.165:4000' + '/api/chisocanhan/update/luong/' + taikhoan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    luong: 10000
                })
            })
        }
        else if (luongtamtinhs >= 3000) {
            fetch('http://192.168.1.165:4000' + '/api/chisocanhan/update/luong/' + taikhoan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    luong: 30000
                })
            })
        }
    }

    useEffect(() => {
        if (luongtamtinhs > 200 && luongtamtinhs < 300) {
            fetch('http://192.168.1.165:4000' + '/api/chisocanhan/update/luong/' + taikhoan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    luong: 20000
                })
            })
        }
        else if (luongtamtinhs > 1000 && luongtamtinhs < 2000) {
            fetch('http://192.168.1.165:4000' + '/api/chisocanhan/update/luong/' + taikhoan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    luong: 10000
                })
            })
        }
        else if (luongtamtinhs >= 3000) {
            fetch('http://192.168.1.165:4000' + '/api/chisocanhan/update/luong/' + taikhoan, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    luong: 30000
                })
            })
        }
    }, [luongtamtinhs])

    const data = {
        labels: ["Swim"], // optional
        data: [0.4]
    };

    const data1 = {
        labels: ["Th??? 2", "Th??? 3", "Th??? 4 ", "Th??? 5", "Th??? 6", "Th??? 7"],
        datasets: [
            {
                data: [2, 1, 3, 0, 2, 3]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.1,
        color: (opacity = 1) => theme.color,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,// optional
        backgroundColor: '#fff',
        background: "none"


    };

    const chartConfig2 = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.1,
        color: (opacity = 1) => `rgba(135,206,250, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,// optional
        backgroundColor: '#fff',
        background: "none"


    };

    const chartConfig3 = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.1,
        color: (opacity = 1) => `rgba(255,255,0, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,// optional
        backgroundColor: '#fff',
        background: "none"


    };

    const chartConfig4 = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.1,
        color: (opacity = 1) => `rgba(0,128,0, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false,// optional
        backgroundColor: '#fff',
        background: "none"


    };


    const data2 = [

        {
            name: "TB Hi???n T???i",
            population: luongtamtinhs && luongtamtinhs || 0,
            color: "#56d187",
            legendFontColor: "green",
            legendFontSize: 15,
        },
        {
            name: "TB thi???u",
            population: 7000 - (luongtamtinhs && luongtamtinhs || 0),
            color: "#f5b41d",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },

    ];

    const chartConfigPie = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => ` rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    }

    const data4 = {
        labels: ["Test1", "Test2"],
        legend: ["L1", "L2"],
        data: [
            [60, 60],
            [30, 30]
        ],
        barColors: ["#dfe4ea", "#ced6e0"]
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.maunen }]}>
            <ScrollView style={{
                width: '100%'
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <Text style={{
                        fontSize: 23,
                        paddingHorizontal: 20,
                        marginTop: 15,
                        color: theme.color

                    }}>L????ng T???m T??nh</Text>
                    <Text style={{
                        fontSize: 23,
                        paddingHorizontal: 20,
                        marginTop: 15,
                        color: theme.color

                    }}>Ng??y C??ng</Text>
                </View>


                <View style={{
                    flexDirection: 'row',
                    backgroundColor: theme.maunen,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            padding: 10,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginLeft: 20

                        }} >
                            <View style={{
                            }}>
                                <View>
                                    <ProgressChart
                                        data={data}
                                        width={120}
                                        height={120}
                                        strokeWidth={10}
                                        radius={50}
                                        chartConfig={chartConfig}
                                        hideLegend={true}
                                        style={{
                                            backgroundColor: theme.maunen,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 20

                                        }}

                                    />
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    left: '35%',
                                    top: '35%'
                                }}>
                                    <FontAwesome5 name="money-bill-wave" size={30} color="green" />
                                    <Text style={{
                                        color: theme.color

                                    }}>
                                        40%
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                // padding: 20
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 23,
                                    fontWeight: 'bold',
                                    color: theme.color

                                }}>
                                    {luongs}
                                </Text>
                                <Text style={{
                                    fontSize: 17,
                                    opacity: 0.3,
                                    color: theme.color

                                }}>
                                </Text>
                            </View>

                        </View>

                        <View style={{
                            padding: 10,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginLeft: 40

                        }} >
                            <View style={{
                            }}>

                                <View>
                                    <ProgressChart
                                        data={data}
                                        width={120}
                                        height={120}
                                        strokeWidth={10}
                                        radius={50}
                                        chartConfig={chartConfig}
                                        hideLegend={true}
                                        style={{
                                            backgroundColor: theme.background,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 20
                                        }}

                                    />
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    left: '35%',
                                    top: '35%'
                                }}>
                                    <Text style={{
                                        fontSize: 22,
                                        textAlign: 'center',
                                        marginLeft: 10,
                                        marginTop: 5,
                                        color: theme.color

                                    }}>
                                        {ngaycong}
                                    </Text>
                                </View>
                            </View>

                            <View style={{
                                // padding: 20
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: 'red',

                                }}>
                                    C??? G???ng H??n Nh??
                                </Text>
                                <Text style={{
                                    fontSize: 17,
                                    opacity: 0.3
                                }}>
                                </Text>
                            </View>

                        </View>

                    </View>
                </View>

                <View style={{
                    // marginBottom: 60
                }}>
                    <Text style={{
                        padding: 20,
                        fontSize: 22,
                        color: theme.color

                    }}>
                        Gi?? Tr??? Trung B??nh : 700,000?? - {luongtamtinhs}
                    </Text>


                    <PieChart
                        data={data2}
                        width={Dimensions.get('window').width - 10}
                        height={220}
                        chartConfig={chartConfigPie}
                        accessor={'population'}
                        backgroundColor={'transparent'}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        }}
                    // absolute
                    // outerRadius={'55%'}
                    />
                </View>

                <View style={{
                    marginVertical: 8,
                    borderRadius: 16,

                    marginVertical: 8,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center'


                }}>
                    <Text style={{
                        padding: 20,
                        fontSize: 22,
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        color: theme.color

                    }}>
                        S??? ????n Ph??t Sinh
                    </Text>
                    <View style={{
                        width: '90%',
                    }}>
                        <BarChart
                            // style={graphStyle}
                            data={data1}
                            width={Dimensions.get('window').width - 40}
                            height={220}
                            yAxisLabel="????n"
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,

                            }}
                            backgroundColor={theme.background}


                        />
                    </View>

                </View>

                <View style={{
                    marginVertical: 8,
                    borderRadius: 16,

                    marginVertical: 8,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center'


                }}>
                    <Text style={{
                        padding: 20,
                        fontSize: 22,
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        color: theme.color

                    }}>
                        S??? ????n V??? Sinh
                    </Text>
                    <View style={{
                        width: '90%',
                    }}>
                        <BarChart
                            // style={graphStyle}
                            data={data1}
                            width={Dimensions.get('window').width - 40}
                            height={220}
                            yAxisLabel="????n"
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,

                            }}

                        />
                    </View>

                </View>

                <View>
                    <View style={{
                        // marginBottom: 60
                    }}>
                        <Text style={{
                            padding: 20,
                            fontSize: 22,
                            color: theme.color

                        }}>
                            T??? L??? V??? Sinh
                        </Text>


                        <PieChart
                            data={data2}
                            width={Dimensions.get('window').width - 40}
                            height={220}
                            chartConfig={chartConfigPie}
                            accessor={'population'}
                            backgroundColor={'transparent'}
                            style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                // marginLeft: -10
                            }}
                            // absolute
                            outerRadius={'55%'}
                        />
                    </View>
                    <View style={{
                        // marginBottom: 60
                    }}>
                        <Text style={{
                            padding: 20,
                            fontSize: 22,
                            color: theme.color

                        }}>
                            Ch??? S??? OLE
                        </Text>


                        <PieChart
                            data={data2}
                            width={Dimensions.get('window').width - 40}
                            height={220}
                            chartConfig={chartConfigPie}
                            accessor={'population'}
                            backgroundColor={'transparent'}
                            style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                // marginLeft: -10
                            }}
                            // absolute
                            outerRadius={'55%'}
                        />
                    </View>
                </View>

                <View style={{
                    marginHorizontal: 20,
                    width: '90%'
                }}>
                    <Text style={{
                        fontSize: 22,
                        marginTop: 20,
                        marginBottom: 10,
                        color: theme.color

                    }}>
                        Sales Report
                    </Text>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ],

                                },
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ],

                                }
                            ],

                        }}
                        width={Dimensions.get("window").width - 40} // from react-native
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#DDDDDD",
                            backgroundGradientFrom: "#EEEEEE",
                            backgroundGradientTo: "#EEEEEE",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(	0,191,255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                                // marginLeft: 20

                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }

                        }
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 2.27,
                            elevation: 10,
                        }}
                    />
                </View>




                <StackedBarChart
                    height={280}
                    data={data4}
                    width={300}
                    chartConfig={chartConfig}
                    showLegend={false}
                    withHorizontalLabels={true}
                />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
