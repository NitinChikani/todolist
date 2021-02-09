import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Style from '../Theme/Style';
import { validationBlank } from '../Theme/Const';
import TodoListView from '../Compoment/TodoListView';


const Home = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [visibleModalAddItem, setVisibleModalAddItem] = useState();
    const [todoList, setTodoList] = useState([]);

    // function change the Date 
    const onChangeDate = (event, selectedDate) => {
        var currentDate
        if (event.type === 'dismissed') {
            currentDate = new Date();
        } else {
            currentDate = selectedDate
        }
        setDate(currentDate);
        setShow(false)
        var date = moment(currentDate).format('DD-MM-YYYY')
        setSelectedDate(date)
    };

    // function change the time
    const onChangeTime = (event, selectedDate) => {
        var currentDate
        if (event.type === 'dismissed') {
            currentDate = new Date();
        } else {
            currentDate = selectedDate
        }
        setShowTime(false)
        setTime(currentDate);
        var timeview = moment(selectedDate).format('HH:mm')
        setSelectedTime(timeview)
    }

    // function for validation
    function validation() {
        if (validationBlank(selectedDate, 'Please Select Date') && validationBlank(selectedTime, 'Please Select Time') && validationBlank(title, 'Please Enter Title') && validationBlank(description, 'Please Enter Description')) {
            additem()
        }
    }

    // function to add into list
    async function additem() {
        // add in state
        await setTodoList([...todoList, { key: Date.now(), title: title, description: description, date: selectedDate, datetimestemp: date, timtimestemp: time, time: selectedTime, isChecked: false }])

        setVisibleModalAddItem(null)
        setTitle('')
        setDescription('')
        setSelectedDate('')
        setSelectedTime('')
    }
    // function to mark todo as checked or unchecked
    const checkTodo = id => {
        setTodoList(
            todoList.map(todo => {
                if (todo.key === id) {
                    todo.isChecked = !todo.isChecked;
                }
                return todo;
            })
        );
    };

    // function to delete todo from the todo list
    const deleteTodo = id => {
        setTodoList(todoList.filter(todo => {
            return todo.key !== id;
        }));
    };


    useEffect(() => {
        console.log(todoList.length, "TodoList length");
    }, [todoList]);


    return (

        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden />
            <View style={{ flex: 1 }}>
                <View style={{ height: '7%', padding: '2%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>To-Do Application</Text>
                </View>
                <View style={{ height: '95%', padding: '2%' }}>
                    <ScrollView>
                        {todoList.map(todo => (
                            <TodoListView
                                key={todo.key}
                                todo={todo}
                                checkTodo={checkTodo}
                                deleteTodo={deleteTodo}
                            // editTodo={editTodo}
                            />
                        ))}
                    </ScrollView>
                </View>
                <Icon reverse name='plus' type='antdesign' size={25} containerStyle={{ position: 'absolute', bottom: 5, right: 5 }} color='blue'
                    onPress={() => {
                        console.log('check click')
                        setVisibleModalAddItem('bottom')
                    }} />
            </View>
            <Modal
                isVisible={visibleModalAddItem === 'bottom'}
                onSwipeComplete={() => setVisibleModalAddItem(null)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onBackdropPress={() => setVisibleModalAddItem(null)}
                onBackButtonPress={() => setVisibleModalAddItem(null)}>
                <View style={{ height: '100%' }}>
                    <Icon raised name='x' type='feather' color='blue' size={20}
                        containerStyle={{ alignSelf: 'flex-end', }}
                        onPress={() => setVisibleModalAddItem(null)}
                    />
                    <View style={{ height: '92%', padding: '2%' }}>
                        <TouchableOpacity style={[Style.card, { flexDirection: 'row', marginVertical: '2%' }]} onPress={() => {
                            setShow(true)
                        }}>
                            <Text style={{ flex: 0.5 }}>Select Date</Text>
                            <Text style={{ flex: 0.5 }}>{selectedDate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Style.card, { flexDirection: 'row', marginVertical: '2%' }]} onPress={() => {
                            setShowTime(true)
                        }}>
                            <Text style={{ flex: 0.5 }}>Select Time</Text>
                            <Text style={{ flex: 0.5 }}>{selectedTime}</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={[Style.card, { width: '100%', marginVertical: '2%' }]}
                            placeholder='Enter Title'
                            onChangeText={text => setTitle(text)}
                            value={title}
                            keyboardType='default'
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                        />
                        <TextInput
                            style={[Style.card, { width: '100%', marginVertical: '2%', }]}
                            placeholder='Enter Description'
                            onChangeText={text => setDescription(text)}
                            value={description}
                            keyboardType='default'
                            underlineColorAndroid='transparent'
                            placeholderTextColor={'black'}
                            numberOfLines={5}
                            multiline={true}
                        />
                        <TouchableOpacity style={[Style.card, { backgroundColor: 'blue', marginVertical: '10%' }]}
                            onPress={() => validation()}>
                            <Text style={{ fontSize: 18, width: '95%', textAlign: 'center', color: 'white' }}>Add Item</Text>
                        </TouchableOpacity>
                        {/* to view Date picker */}
                        {show ?
                            <DateTimePicker
                                testID="datePicker"
                                value={date}
                                mode={"date"}
                                is24Hour={true}
                                minimumDate={new Date()}
                                display="spinner"
                                onChange={onChangeDate}
                            />
                            : null}
                        {/* time picker */}
                        {showTime ?
                            <DateTimePicker
                                testID="datePicker"
                                value={date}
                                mode={"time"}
                                is24Hour={true}
                                minimumDate={new Date()}
                                display="spinner"
                                onChange={onChangeTime}
                            />
                            : null}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
};

export default Home;
