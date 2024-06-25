import styled from "styled-components/native";

export const PoemContainer = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    margin-right: ${({ theme }) => theme.metrics.px(24)}px;
    height: ${({ theme, h }) => (h ? `${theme.metrics.px(h)}px` : `${theme.metrics.px(200)}px`)};
    width: ${({ theme, w }) => (w ? `${theme.metrics.px(w)}px` : `${theme.metrics.px(200)}px`)};
    padding: ${({theme}) => theme.metrics.px(20)}px;
    border-radius: ${({ theme }) => theme.metrics.px(8)}px;
    overflow-y: hidden;
    background-color: blue;
`;

export const PoemText = styled.View`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${({theme}) => theme.metrics.px(100)}px;
`;
