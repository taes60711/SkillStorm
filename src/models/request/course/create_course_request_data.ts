/**
 * 創課程用Data
 */
export interface CreateCourseRequestData {
    title: string; // 標題
    needLevel: number; // 看板
    outline: string; // 大綱
    beforeNeed: string;// 前置
    prStory: string;// 詳細內容
    courseChapters: ChapterData[]; // 章節
    learningkillList: string[]; // 學習的技能
    type: string; // 類別的id（前端, 後端, 雲端...）
    isPublic: boolean;// 是否公開
}

/**
 * 課程中的章節Data
 */
export interface ChapterData {
    chapter: number; // 章節index
    chapterName: string; // 章節標題
    content: string[];// 章節內容（只要給第一個就好）
}