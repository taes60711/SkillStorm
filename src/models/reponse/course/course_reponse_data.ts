import type { ProfileData } from "../auth/profile_data_reponse_data";
import type { CourseChapter } from "./course_chapter_info_data";

/**
 * 技術文章Data
 */
export interface Course {
  id: number;
  createdBy: string;
  title: string;
  needLevel: number;
  content: string;
  beforeNeed: string;
  prStory: string;
  courseChapters: CourseChapter[];
  courseLearningkillList: string[];
  createdTime: string;
  type: string;
  isPublic: boolean;
  signUpStatus: string;
  user: ProfileData;
  isLike: boolean;
}
