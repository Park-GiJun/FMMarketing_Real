import { create } from 'zustand';
import axios from 'axios';

// 모의 사용자 데이터
const mockUsers = [
  { id: 1, email: 'admin@fmmarketing.com', password: 'admin123', name: '관리자', role: 'ROLE_ADMIN' },
  { id: 2, email: 'blogger@example.com', password: 'blogger123', name: '블로거', role: 'ROLE_BLOGGER' },
  { id: 3, email: 'store@example.com', password: 'store123', name: '매장관리자', role: 'ROLE_STORE' },
];

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    // 잠시 대기하여 로딩 상태 확인 가능
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // 사용자 인증 로직 (모의)
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
      
      // 가상 토큰 생성
      const token = `mock_token_${user.id}_${Date.now()}`;
      
      // localStorage에 토큰 저장
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }));
      
      // axios 기본 헤더 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token: token,
        isAuthenticated: true,
        isLoading: false
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      set({ 
        error: error.message || '로그인에 실패했습니다. 자격 증명을 확인하세요.',
        isLoading: false
      });
      return false;
    }
  },

  logout: () => {
    // localStorage에서 토큰 제거
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // axios 헤더에서 인증 정보 제거
    delete axios.defaults.headers.common['Authorization'];
    
    set({ 
      user: null,
      token: null,
      isAuthenticated: false
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return false;
    }

    // localStorage에서 사용자 정보 가져오기
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      get().logout();
      return false;
    }
    
    try {
      const user = JSON.parse(userStr);
      
      // token 확인 (실제로는 백엔드에서 검증)
      // 여기서는 시연을 위해 항상 유효한 것으로 처리
      
      // axios 기본 헤더 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        isAuthenticated: true
      });
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      // 토큰이 유효하지 않으면 로그아웃
      get().logout();
      return false;
    }
  },

  // 개발용: 특정 역할로 빠른 로그인
  devLogin: (role) => {
    const user = mockUsers.find(u => u.role === role);
    if (!user) return false;
    
    // 가상 토큰 생성
    const token = `mock_token_${user.id}_${Date.now()}`;
    
    // localStorage에 토큰 저장
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }));
    
    // axios 기본 헤더 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    set({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: token,
      isAuthenticated: true,
      isLoading: false
    });
    
    return true;
  },

  clearError: () => set({ error: null })
}));

// 초기화: 저장된 토큰이 있으면 axios 헤더에 설정
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
