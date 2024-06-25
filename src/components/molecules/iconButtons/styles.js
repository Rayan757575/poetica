import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${({theme}) => theme.metrics.px(24)}px;
`;
