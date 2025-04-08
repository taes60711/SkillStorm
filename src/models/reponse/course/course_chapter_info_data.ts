import type { ProfileData } from "../auth/profile_data_reponse_data";

/**
 * 技術文章的章節Data
 */
export interface CourseChapter {
  chapter: number;
  chapterName: string;
  content: string[];
}
