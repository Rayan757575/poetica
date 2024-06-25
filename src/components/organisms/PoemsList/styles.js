import styled from 'styled-components/native'

export const List = styled.FlatList`
    padding: 0 ${({ theme }) => theme.metrics.px(24)}px;
    width: ${({ theme, w }) => (w ? `${theme.metrics.px(w)}px` : '100%')};
    height: ${({ theme, h }) => (h ? `${theme.metrics.px(h)}px` : '100%')};
`;

export const ListContainer = styled.View`
    width: ${({ theme, w }) => (w ? `${theme.metrics.px(w)}px` : '100%')};
    height:${({ theme }) => theme.metrics.px(200)}px;
    margin: ${({theme}) => theme.metrics.px(200)}px 0;
`;