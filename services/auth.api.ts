import AsyncStorage from "@react-native-async-storage/async-storage";

/* =====================
   TYPES (GIỮ NGUYÊN)
===================== */
export type UserProfile = {
  userId: number;
  email: string;

  employeeId: number;
  name: string;
  phone: string;
  coverImage: string;
  avatar: string;
};

export type CompanyProfile = {
  userId: number;
  email: string;

  companyId: number;
  companyName: string;
  activityField: string;
  coverImage: string;
  avatar: string;
  taxIdentification: number;
  address: string;
  description: string;
};

export type LoginResponse =
  | {
      success: true;
      message: string;
      data: UserProfile | CompanyProfile;
    }
  | {
      success: false;
      message: string;
      data: null;
    };

/* =====================
   FAKE DATA
===================== */
const demoUsers = [
  {
    userId: 1,
    email: "company@gmail.com",
    password: "123",
    status: 1,
    role: "COMPANY",
  },
  {
    userId: 2,
    email: "user@gmail.com",
    password: "123",
    status: 1,
    role: "USER",
  },
];

const demoUserProfiles: UserProfile[] = [
  {
    userId: 2,
    email: "user@gmail.com",
    employeeId: 1,
    name: "Nguyễn Văn A",
    phone: "0909123456",
    coverImage: "https://cover-user.png",
    avatar: "https://avatar-user.png",
  },
];

const demoCompanyProfiles: CompanyProfile[] = [
  {
    userId: 1,
    email: "company@gmail.com",
    companyId: 1,
    companyName: "FPT Software",
    activityField: "CNTT",
    coverImage: "https://cover-company.png",
    avatar: "https://logo-company.png",
    taxIdentification: 123456789,
    address: "TP Hồ Chí Minh",
    description: "Công ty công nghệ",
  },
];

/* =====================
   STORAGE
===================== */
const STORAGE_KEY = "auth";

export const saveAuth = async (data: UserProfile | CompanyProfile) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getAuth = async (): Promise<
  UserProfile | CompanyProfile | null
> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const logout = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

/* =====================
   LOGIN API
===================== */
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const user = demoUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return {
      success: false,
      message: "Sai email hoặc mật khẩu",
      data: null,
    };
  }

  let profile: UserProfile | CompanyProfile | null = null;

  if (user.role === "USER") {
    profile = demoUserProfiles.find((p) => p.userId === user.userId) ?? null;
  }

  if (user.role === "COMPANY") {
    profile = demoCompanyProfiles.find((p) => p.userId === user.userId) ?? null;
  }

  if (!profile) {
    return {
      success: false,
      message: "Không tìm thấy hồ sơ người dùng",
      data: null,
    };
  }
  await saveAuth(profile);

  return {
    success: true,
    message: "Đăng nhập thành công",
    data: profile,
  };
};
