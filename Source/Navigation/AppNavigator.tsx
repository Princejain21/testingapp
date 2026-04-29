import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UploadScreen from '../Screens/UploadScreen';
import CaptureScreen from '../Screens/CaptureScreen';

// Fix the path error if I made one
// I wrote d:\native projects\awesome\Source\Screens\CaptureScreen.tsx
// So it should be '../Screens/CaptureScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Upload"
            >
                <Stack.Screen name="Upload" component={UploadScreen} />
                <Stack.Screen name="Capture" component={CaptureScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
