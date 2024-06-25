import styled from 'styled-components/native'

export const List = styled.FlatList`
  margin-top: ${({ theme }) => theme.metrics.px(40)}px;
  padding: 0 24px;
  width: ${({ theme, w }) => (w ? `${theme.metrics.px(w)}px` : '100%')};
  height: ${({ theme, h }) => (h ? `${theme.metrics.px(h)}px` : '100%')};
  background-color: ${({ bg, theme }) => theme.colors[bg || 'light']};
`;