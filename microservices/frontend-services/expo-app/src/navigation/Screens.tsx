import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  About,
  Agreement,
  Articles,
  Chat,
  Components,
  Extras,
  Home,
  Notifications,
  Privacy,
  Profile,
  Register,
  Login,
  Rental,
  Rentals,
  Booking,
  Settings,
  Shopping,
  NotificationsSettings,
} from '../screens';

import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={{
      ...screenOptions.stack,
      headerTitleAlign: 'left' as const // Fix type error by explicitly setting as 'left'
    }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          ...screenOptions.components,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen
        name="Rentals"
        component={Rentals}
        options={{
          title: t('navigation.rentals'),
          ...screenOptions.profile,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Rental"
        component={Rental}
        options={{
          title: t('navigation.rental'),
          ...screenOptions.stack,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          title: t('navigation.booking'),
          ...screenOptions.stack,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: t('navigation.chat'),
          ...screenOptions.stack,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t('navigation.settings'),
          ...screenOptions.profile,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="NotificationsSettings"
        component={NotificationsSettings}
        options={{
          title: t('navigation.notifications'),
          ...screenOptions.back,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: t('navigation.notifications'),
          ...screenOptions.back,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{
          title: t('navigation.agreement'),
          ...screenOptions.back,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: t('navigation.about'),
          ...screenOptions.back,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{
          title: t('navigation.privacy'),
          ...screenOptions.back,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Extra"
        component={Extras}
        options={{
          title: t('navigation.extra'),
          headerRight: () => null,
          headerTitleAlign: 'left' as const
        }}
      />

      <Stack.Screen
        name="Shopping"
        component={Shopping}
        options={{
          title: t('navigation.shopping'),
          ...screenOptions.back,
          headerTitleAlign: 'left' as const
        }}
      />
    </Stack.Navigator>
  );
};
