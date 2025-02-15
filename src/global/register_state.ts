import { ref, computed } from "vue";

/**
 * RegisterStateStore
 * 用於管理註冊流程的狀態
 */
export default class RegisterStateStore {
  private static instance: RegisterStateStore;

  private constructor() { }

  public static getInstance(): RegisterStateStore {
    if (!RegisterStateStore.instance) {
      RegisterStateStore.instance = new RegisterStateStore();
    }
    return RegisterStateStore.instance;
  }

  // 註冊流程狀態
  private registerStep = ref<number>(0);
  private email = ref<string>("");

  // Getters
  get currentStep() {
    return computed(() => this.registerStep.value);
  }

  get registeredEmail() {
    return computed(() => this.email.value);
  }

  // Setters
  setStep(step: number) {
    this.registerStep.value = step;
  }

  setEmail(email: string) {
    this.email.value = email;
  }

  // 重置狀態
  reset() {
    this.registerStep.value = 0;
    this.email.value = "";
  }
}

// 導出單例實例
export const registerState = RegisterStateStore.getInstance(); 