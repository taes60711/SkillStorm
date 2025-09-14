import { ref, type Ref } from "@vue/reactivity";
import UserService from "@/services/user_service";
import type {
  ProfileData,
  Skill
} from "@/models/reponse/auth/profile_data_reponse_data";
import type { UpdateProfileRequestData } from "@/models/request/auth/update_profile_request_data";
import { userDataStore } from "@/global/user_data";
import { RouterPath } from "@/router/router_path";
import router from "@/router/router_manager";
import { EditTools } from "@/global/edit_tools";

export default class EditProfileViewModel {
  private userService: UserService = new UserService();

  public formData = ref<UpdateProfileRequestData>({
    uid: "",
    name: "",
    image: "",
    introduction: "",
    job: "",
    skills: [],
    wantSkills: []
  });

  public editTools = new EditTools();

  /**
   * 初始化編輯表單
   * @param uid 使用者UID
   */
  public initializeForm() {
    const userData = userDataStore.userData.value;

    if (!userData) return;

    this.formData.value = {
      uid: userData.uid,
      name: userData.name,
      image: userData.image ?? "",
      introduction: userData.introduction ?? "",
      job: userData.job ?? "",
      skills: [...(userData.skills || [])],
      wantSkills: [...(userData.wantSkills || [])]
    };

    console.log("初始化後:", this.formData.value);
  }

  /**
   * 更新用戶資料
   */
  public async updateProfile() {
    this.formData.value.image = await this.editTools.uploadImgToDatabase(
      this.formData.value.image ?? ""
    );
    await this.userService.updateProfileData(this.formData.value);

    const userData: ProfileData = {
      uid: this.formData.value.uid,
      email: userDataStore.userData.value.email,
      password: userDataStore.userData.value.password,
      image: this.formData.value.image,
      introduction: this.formData.value.introduction,
      job: this.formData.value.job,
      lastlogin: userDataStore.userData.value.lastlogin,
      name: this.formData.value.name,
      skills: this.formData.value.skills,
      wantSkills: this.formData.value.wantSkills,
      status: userDataStore.userData.value.status
    };

    userDataStore.setUser(userData);

    router.push(RouterPath.HOME.PROFILE.HOME);
  }

  /**
   * 處理取消編輯
   */
  public handleCancel(): void {
    router.push(RouterPath.HOME.PROFILE.HOME);
  }

  /**
   * 處理檔案選擇
   * @param event 檔案選擇事件
   */
  public handleFileChange = async (event: Event): Promise<void> => {
    const imageUrl: string = await this.editTools.handleLocalImgChange(event);
    this.formData.value.image = imageUrl;
  };

  public onUpdateSkills = (skills: Skill[]) => {
    this.formData.value.skills = skills;
  };

  public onUpdateWantSkills = (skills: Skill[]) => {
    this.formData.value.wantSkills = skills;
  };
}
