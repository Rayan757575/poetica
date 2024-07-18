import { TextInput } from "react-native";
import { Container, ScreenScrollContainer } from "~/components";
import { IconButton } from "~/components/molecules/iconButtons";


export const TextScreen = () =>{
    return (
        <ScreenScrollContainer withPadding>
            <IconButton iconName={'arrow-back'} />
            <TextInput placeholder="Title" multiline ></TextInput>
            <TextInput placeholder="Write here" multiline></TextInput>
        </ScreenScrollContainer>
    )
}