import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

const TodoListView = props => {
    const { todo, checkTodo, deleteTodo,editTodo } = props
    return (
        <View style={styles.listTile}>
            <Icon
                name={todo.isChecked ? "check-circle" : "radio-button-unchecked"}
                type='materialicons'
                style={styles.leading}
                size={20}
                color="#666666"
                onPress={() => checkTodo(todo.key)}
            />
            <View style={{ width: "60%", }}>
                <Text style={styles.title}>{todo.title}</Text>
                <View style={{flexDirection:'row',width:'60%'}}>
                    <Text style={styles.subtitle}>Date - {todo.date}</Text>
                    <Text style={styles.subtitle}>Time - {todo.time}</Text>
                </View>
                <Text style={styles.subtitle} numberOfLines={5}>{todo.description}</Text>
            </View>
            <Icon
                name="delete"
                type='materialicons'
                style={styles.trailing}
                size={20}
                color="#666666"
                onPress={() => deleteTodo(todo.key)}
            />
            {/* <Icon
                name="edit"
                type='materialicons'
                style={styles.trailing}
                size={20}
                color="#666666"
                onPress={() => editTodo(todo.key)}
            /> */}
        </View>
    );
}

export default TodoListView;
const styles = StyleSheet.create({
    listTile: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // backgroundColor: "white",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#666666"
    },
    leading: {
        width: "20%"
    },
    title: {
        width: "100%",
        fontSize: 18
    },
    subtitle: {
        width: "100%",
        fontSize: 14
    },
    trailing: {
        width: "20%"
    }
});