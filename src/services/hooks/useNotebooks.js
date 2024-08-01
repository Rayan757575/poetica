import AsyncStorage from '@react-native-async-storage/async-storage'

const DB_KEY = '@Poetica:User_Notebooks'

export const useNotebooks = () => {
    const createNotebook = async (data) => {
        try {
            let newDb;
            const value = await AsyncStorage.getItem(DB_KEY)
            if (value !== null) {
                // já existe o banco de dados
                const db = JSON.parse(value)
                newDb = [...db, data]
            } else {
                // preciso criar um novo banco e dados
                newDb = [data]
            }
            const JsonValue = JSON.stringify(newDb)
            await AsyncStorage.setItem(DB_KEY, JsonValue)
            console.log({ newDb })
            return newDb
            
        } catch (error) {
            console.log({ error })
            return { error }
        }
    };

    const getNotebooks = async () => {
        let db
        const value = await AsyncStorage.getItem(DB_KEY)
        if (value !== null) {
            return value
        } else {
            return []
        }
    };
    const deleteNotebook = async (data) => {
        try {
            let newDb
            const value = await AsyncStorage.getItem(DB_KEY)
            if (value !== null) {
                //já existe um banco e dados
                const db = JSON.parse(value)
                newDb = Array[db].filter((item) => item.id !== data.id)
            } else {
                newDb = []
            }
            const JsonValue = JSON.stringify(newDb)
            await AsyncStorage.setItem(DB_KEY, JsonValue)
            return newDb
        } catch (error) {
            console.log(error)
        }
    }
    return {
        createNotebook,
        getNotebooks,
        deleteNotebook
    }
}