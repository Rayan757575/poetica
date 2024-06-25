import styled from "styled-components/native";

export const NotebookContainer = styled.TouchableOpacity`
    height:${({ theme, h }) => (h ? `${theme.metrics.px(h)}px` : `${theme.metrics.px(190)}px`)};
    width: ${({ theme, w }) => (w ? `${theme.metrics.px(w)}px` : `${theme.metrics.px(150)}px`)};
    align-items: center;
`;

export const NotebookImage = styled.Image`
    height:${({ theme, h }) => (h ? `${theme.metrics.px(h)}px` : `${theme.metrics.px(150)}px`)};
    width: ${({ theme, w }) => (w ? `${theme.metrics.px(w)}px` : `${theme.metrics.px(150)}px`)};
    border-radius:${({theme}) => theme.metrics.px(30)}px;
`;

export const NotebookText = styled.Text`
    font-size:${({theme}) => theme.metrics.px(12)}px;
    color: ${({ color, theme }) => color || theme.colors.primary};
    font-family:${({theme}) => theme.fonts.regular} ;
    margin-top: ${({theme}) => theme.metrics.px(5)}px;
`;