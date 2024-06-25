import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: ${({ theme }) => theme.metrics.px(900)}px;
`;

export const HeaderImageBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
`;

export const HeaderGradient = styled(LinearGradient)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;