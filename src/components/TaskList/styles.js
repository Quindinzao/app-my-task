import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 1.5,
        marginBottom: 8,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 8,
        padding: 7,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3
        }
    },
    task:{
        color: '#1C1C1C',
        fontSize: 15,
        paddingLeft: 8,
        paddingRight: 35
    }
})