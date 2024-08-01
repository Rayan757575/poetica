import AsyncStorage from '@react-native-async-storage/async-storage'

const DB_KEY = '@Poetica:Notebook_Poems'

export const usePoems = () => {
    const createPoem = async (data) => {
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
            return newDb
        } catch (error) {
            console.log({ error })
            return { error }
        }
    };

    const getPoems = async () => {
        let db
        const value = await AsyncStorage.getItem(DB_KEY)
        if (value !== null) {
            return db
        } else {
            return []
        }
    };
    const deletePoem = async (data) => {
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
        createPoem,
        getPoems,
        deletePoem
    }
}