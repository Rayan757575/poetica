import styled from "styled-components/native";

export const CustomSubTitle = styled.Text`
    font-size:${({theme, size}) => theme.metrics.px(size || 24)}px;
    color: ${({ color, theme }) => color || theme.colors.black};
    font-family:${({theme, fontFamily}) => theme.fonts[fontFamily || 'medium']};
    margin-top: ${({theme, mTop}) => theme.metrics.px(mTop || 0)}px;
    margin-right: ${({theme, mRight}) => theme.metrics.px(mRight || 0)}px;
    margin-bottom: ${({theme, mBottom}) => theme.metrics.px(mBottom || 0)}px;
    margin-left: ${({theme, mLeft}) => theme.metrics.px(mLeft || 0)}px;
`;