import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${({ theme, w }) =>  theme.metrics.px(w || 300)}px; 
    height: ${({ theme, h }) =>  theme.metrics.px(h || 60)}px;
    background-color: ${({ theme, bg }) => theme.colors[bg || 'white']};
    border-radius: ${({theme, radius}) => theme.metrics.px(radius || 50)}px;
    border: 1px black;
    margin: 5px;
`;
