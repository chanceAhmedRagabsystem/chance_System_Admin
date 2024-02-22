/* eslint-disable prettier/prettier */
import React from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import {
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
    I18nManager,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import axios from 'axios';
import { Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
    gray_color,
    searchColor,
    gray_txt
} from './Colors';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Students_NotPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
            ],
            numOfItems: 0,
            found: true,
            search_key: '',
            loading: true,
            network: false,
            cancel_button: false,
            searchBox_width: '95%',
            searchColor: '#FFFFFF',
            detailsOfGroup: this.props.route.params.detailsOfGroup,
            months: this.props.route.params.month,
            details: this.props.route.params.details,
        };
    }

    //   componentDidMount() {
    //     this.fetchDataInterval = setInterval(this.fetchData, 200); // fetch new data every 5 seconds
    //   }

    //   componentWillUnmount() {
    //     clearInterval(this.fetchDataInterval);
    //   }

    //   fetchData = async () => {
    //     try {
    //       const response = await axios.get("http://192.168.1.5/GP_backend/select_approved_charities.php");
    //       const charities = response.data;
    //       this.setState({ charities_list: charities });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    componentDidMount() {
        this.getdata()
        // console.log(this.state.details.grade_id)

    }
    getdata() {
        axios
            .post('http://192.168.1.5/AhmedRagab_System/select_notpay.php', {
                group_id: this.state.detailsOfGroup.group_id,
                grade_id: this.state.details.grade_id,
                month: this.state.months.month_number
            })
            .then(res => {
                console.log(res.data);
                if (res.status == 200) {
                    if (res.data == 'Error') {
                        alert('try again');
                    } else if (typeof res.data == typeof []) {
                        this.setState({ students: res.data });
                    }
                    // console.log(this.state.students)
                }
            });
    }




    render() {
        return (
            <>
                {/* {this.state.network ? (
          <> */}
                {/* Header */}
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 25 }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>
                        <Text style={styles.headerTittleTxtStyle}>طلاب لم يقوموا بالدفع</Text>
                    </View>
                    <View
                        style={{ marginTop: -15, marginRight: 25 }}
                    >
                        <Entypo name="users" size={25} color='#000' />
                        <View style={{ height: 27, minWidth: 25, backgroundColor: '#FFFFFF', borderWidth: .5, borderRadius: 15, justifyContent: 'center', marginTop: -40, marginRight: 10 }}>
                            <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: 'bold', color: initial_color }}>{this.state.students.length}</Text>
                        </View>
                    </View>
                </View>


                {/* Body */}
                {this.state.found ? (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{
                            flex: 1,
                            backgroundColor: Background,
                        }}>
                        {this.state.students.length != 0 ? (
                            <>
                                <ScrollView>
                                    <View>
                                        {this.state.students.map((item, index) =>
                                            // key = {index};
                                            // item.student_show == 1 ? (
                                            <>
                                                <View
                                                    key={index}
                                                    style={{
                                                        backgroundColor: '#FFFFFF',
                                                        elevation: 5,
                                                        width: width * 0.95,
                                                        height: height * .085,
                                                        borderRadius: 15,
                                                        justifyContent: 'center',
                                                        marginVertical: 5,
                                                        alignSelf: "center",
                                                        alignItems: "center",
                                                        borderLeftWidth: 6,
                                                        borderColor: initial_color,
                                                        flexDirection: "row",
                                                        paddingHorizontal: RFValue(10),
                                                        paddingVertical: RFValue(5),
                                                        // borderBlockColor: "#f0f"
                                                    }}>

                                                    <View
                                                        style={{
                                                            width: '99%',
                                                            height: '90%',
                                                            alignItems: "center",
                                                            // backgroundColor: "#ff0",
                                                            justifyContent: "center",
                                                            flexDirection: "column"

                                                        }}
                                                        key={index}>
                                                        <Text
                                                            key={index}
                                                            style={{
                                                                fontSize: 18,
                                                                fontWeight: '600',
                                                                color: '#000',
                                                                marginTop: RFValue(4)
                                                            }}>{item.student_name}
                                                        </Text>
                                                    </View>
                                                </View>

                                            </>
                                            // ) : null,
                                        )}
                                    </View >
                                </ScrollView>
                            </>
                        ) : (
                            <>
                                <View>
                                    <Image
                                        source={require('../images/noPersons.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 300,
                                            height: 250,
                                            alignSelf: 'center',
                                            marginTop: width * 0.30,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#aaa',
                                            textAlign: 'center',
                                            // justifyContent: 'center',
                                            marginTop: RFValue(30),
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                        }}>
                                        لا يوجد طلاب
                                    </Text>
                                </View>
                            </>
                        )}
                    </KeyboardAvoidingView>
                ) : (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{
                            height: '82%',
                            width: '100%',
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                        }}>
                        <Image
                            source={require('../images/noPersons.png')}
                            resizeMode="contain"
                            style={{ width: 300, height: 250, alignSelf: 'center', }}
                        />
                        <Text style={{
                            color: '#aaa',
                            textAlign: 'center',
                            // justifyContent: 'center',
                            marginTop: RFValue(30),
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>
                            لا يوجد طالب بهذا الأسم
                        </Text>
                    </KeyboardAvoidingView>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        width: width,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: height * 0.08,
        justifyContent: 'space-around',
        backgroundColor: Background,
    },
    headerTittleContainer: {
        width: width * 0.9,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        // marginLeft: RFValue(15)
    },
    headerTittleTxtStyle: {
        color: secondary_color,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(18),
    },
    addCaseBtn: {
        bottom: 0,
        elevation: 5,
        right: RFValue(15),
        shadowRadius: 9.51,
        shadowColor: '#000',
        shadowOpacity: 0.43,
        width: width * 0.3,
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'flex-end',
        height: height * 0.05,
        padding: width * 0.009,
        borderRadius: width * 0.5,
        justifyContent: 'center',
        marginBottom: height * 0.03,
        backgroundColor: "#0f0",
        shadowOffset: { width: 0, height: 7 },
    },
});