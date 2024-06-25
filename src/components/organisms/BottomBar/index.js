import { Ionicons } from '@expo/vector-icons'
import { Text } from '~/components/atoms';
import { BottomBarContainer, BarItem } from './styles';
import { theme } from '~/styles';

const routeIcons = {
    Home: 'home-outline',
    Notebooks: 'library-outline'
}

export const BottomBar = ({ state, descriptors, navigation }) => {
    return (
        <BottomBarContainer>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <BarItem
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        <Ionicons
                            size={theme.metrics.px(20)}
                            name={routeIcons[route.name]}
                            color={isFocused ? theme.colors.primary : theme.colors.black}
                        />
                        <Text
                            fontFamily="semiBold"
                            size={10}
                            color={isFocused ? 'primary': 'black'}
                        >
                            {label}
                        </Text>
                    </BarItem>
                );
            })}
        </BottomBarContainer>
    );
}

// ...
