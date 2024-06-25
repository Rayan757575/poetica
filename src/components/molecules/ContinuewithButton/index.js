import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, ButtonContainer } from "~/components/atoms";
import { useNavigation } from "@react-navigation/native";
import { theme } from "~/styles";


export const ContinueButton = ({ IconName, bg, color, children }) => {
    const navigation = useNavigation()
    return (
        <ButtonContainer bg={bg} onPress={() => { navigation.navigate('Notebooks') }}>
            <Ionicons name={IconName} size={theme.metrics.px(24)} />
            <Text mLeft={20} color={color}>{children}</Text>
        </ButtonContainer>
    )
}