import { ButtonContainer } from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from "~/styles";

//icons like share, create and edit
export const IconButton = ({iconName, iconColor, onPress }) => {
    return(
        <ButtonContainer onPress={onPress}>
            <Ionicons name={iconName} color={iconColor} size={theme.metrics.px(24)} />
        </ButtonContainer>
    )
}