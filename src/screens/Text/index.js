import { TextInput } from "react-native";
import React, { useState } from 'react'
import { Container, ScreenScrollContainer, Text } from "~/components";
import { IconButton } from "~/components/molecules/iconButtons";
import { usePoems } from "~/services/hooks";



export const TextScreen = ({ navigation }) => {
    const {  createPoem, getPoems, deletePoem } = usePoems()
    const [text, onChangeText] = useState('Useless Multiline Placeholder');
    const [title, onChangeTitle] = useState('Useless Multiline Placeholder');
/*
    const createNewPoem = async () => {
        const result = await createPoem(text)
        console.log("oi")
    }*/
    return (
        <ScreenScrollContainer withPadding>
            <IconButton iconName={'arrow-back'} onPress={() => createNewPoem()}/>
            <TextInput placeholder="Title" multiline onChangeText={title => onChangeTitle(title)}></TextInput>
            <TextInput placeholder="Write here" multiline onChangeText={text => onChangeText(text)}></TextInput>
        </ScreenScrollContainer>
    )
}