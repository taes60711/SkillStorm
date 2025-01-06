// ViewModel層：管理登入表單的狀態和驗證邏輯
import { ref, computed } from 'vue';
import type { UserCredentials } from '../models/UserModel';

/**
 * 登入表單相關的組合式函數
 * 管理表單狀態和驗證邏輯
 */
export function useLoginForm() {
  // 表單數據
  const formData = ref<UserCredentials>({
    email: '',
    password: ''
  });

  // 表單錯誤狀態
  const errors = ref({
    email: false,
    password: false
  });

  // 密碼顯示狀態
  const showPassword = ref(false);

  // 密碼驗證計算屬性
  // 待 Tom 接上：這裡的密碼驗證規則需要與後端的驗證規則保持一致
  const passwordLength = computed(() => formData.value.password.length >= 6);  // 待 Tom 接上：確認密碼長度限制
  const hasEnglish = computed(() => /[a-zA-Z]/.test(formData.value.password)); // 待 Tom 接上：確認英文字符要求
  const hasNumber = computed(() => /[0-9]/.test(formData.value.password));     // 待 Tom 接上：確認數字要求

  // 表單有效性計算屬性
  const isFormValid = computed(() => {
    // 待 Tom 接上：這裡需要加入與後端一致的驗證規則
    return formData.value.email &&    // 待 Tom 接上：需要加入郵箱格式驗證
           passwordLength.value &&     
           hasEnglish.value &&        
           hasNumber.value;           
  });

  /**
   * 重置表單
   * 清空表單數據和錯誤狀態
   */
  const resetForm = () => {
    // 重置表單數據
    formData.value = {
      email: '',
      password: ''
    };
    // 重置錯誤狀態
    errors.value = {
      email: false,
      password: false
    };
  };

  /**
   * 驗證表單
   * @returns boolean - 表單是否有效
   */
  const validateForm = () => {
    // 待 Tom 接上：這裡需要加入更詳細的錯誤檢查邏輯
    errors.value.email = !formData.value.email;    // 待 Tom 接上：需要加入郵箱格式錯誤提示
    errors.value.password = !formData.value.password; // 待 Tom 接上：需要加入密碼格式錯誤提示
    return isFormValid.value;
  };

  // 返回表單相關的狀態和方法
  return {
    form: formData,     // 表單數據
    errors,            // 錯誤狀態
    showPassword,      // 密碼顯示狀態
    passwordLength,    // 密碼長度驗證
    hasEnglish,       // 英文字符驗證
    hasNumber,        // 數字驗證
    isFormValid,      // 表單有效性
    resetForm,        // 重置表單方法
    validateForm      // 驗證表單方法
  };
}
