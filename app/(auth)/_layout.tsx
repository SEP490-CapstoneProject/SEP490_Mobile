import { router, Slot, usePathname } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export default function AuthLayout() {
  const pathname = usePathname();

  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#111' }}>
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 20,
        }}
      >
        
        <Image
          source={require('../../assets/myApp/Logo.png')}
          style={{ width: 80, height: 80, alignSelf: 'center', marginBottom: 12 }}
        />

        {/* TAB SWITCH */}
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <Pressable
            onPress={() => router.push('/login')}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: isLogin ? '#1e90ff' : '#ddd',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: isLogin ? '#1e90ff' : '#999',
                fontWeight: '600',
              }}
            >
              Đăng nhập
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/register')}
            style={{
              flex: 1,
              paddingVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: isRegister ? '#1e90ff' : '#ddd',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: isRegister ? '#1e90ff' : '#999',
                fontWeight: '600',
              }}
            >
              Đăng ký
            </Text>
          </Pressable>
        </View>

        {/* NỘI DUNG FORM */}
        <Slot />
      </View>
    </View>
  );
}
