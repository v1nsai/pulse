import { View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Index() {
  const handleAuthentication = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Error', 'Your device does not support Face ID');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No Face ID is enrolled on this device');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Face ID',
      fallbackLabel: 'Use Passcode',
      disableDeviceFallback: true
    });

    if (result.success) {
      Alert.alert('Authenticated', 'You have successfully authenticated with Face ID');
    } else {
      Alert.alert('Authentication Failed', 'Failed to authenticate with Face ID');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Authenticate with Face ID" onPress={handleAuthentication} />
    </View>
  );
}
