import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, Welcome, Home, NotebookScreen, Poems, TextScreen } from '~/screens';
import { BottomBar } from '~/components';

//refazer a welcome screen
const BottomRoute = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator tabBar={props => <BottomBar {...props}/>}  screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Notebooks' options={{tabBarLabel: 'Notebooks'}} component={NotebookScreen} />
        </Tab.Navigator>
    )
}

export const Routes = () => {

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="HomeBottomBar" component={BottomRoute} />
                <Stack.Screen name="Poems" component={Poems} />
                <Stack.Screen name="Text" component={TextScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}