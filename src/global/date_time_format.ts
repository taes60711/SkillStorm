export class DateFormatUtilities {
  format(timeStr: string): string {
    if (!timeStr) return "";

    const dateUtc = new Date(timeStr);
    const dateLocal = new Date(
      dateUtc.getTime() + new Date().getTimezoneOffset() * -60000
    );
    const now = new Date();
    const diff = now.getTime() - dateLocal.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffInDays > 14) {
      const yyyy = dateUtc.getFullYear().toString().padStart(4, "0");
      const mm = (dateUtc.getMonth() + 1).toString().padStart(2, "0");
      const dd = dateUtc.getDate().toString().padStart(2, "0");
      return `${yyyy}/${mm}/${dd}`;
    }

    if (diffInSeconds < 60) return "剛剛";
    if (diffInMinutes < 60) return `${diffInMinutes}分鐘前`;
    if (diffInHours < 24) return `${diffInHours}小時前`;
    if (diffInDays < 7) return `${diffInDays}天前`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}週前`;
    }

    return "";
  }

  noYYYYMMDDformat(timeStr: string): string {
    if (!timeStr) return "";

    const dateUtc = new Date(timeStr);
    const dateLocal = new Date(
      dateUtc.getTime() + new Date().getTimezoneOffset() * -60000
    );
    const now = new Date();
    const diff = now.getTime() - dateLocal.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffInSeconds < 60) return "剛剛";
    if (diffInMinutes < 60) return `${diffInMinutes}分鐘前`;
    if (diffInHours < 24) return `${diffInHours}小時前`;
    if (diffInDays < 7) return `${diffInDays}天前`;
    if (diffInDays >= 7) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}週前`;
    }

    return "";
  }

  hHMMformat(timeStr: string): string {
    if (!timeStr) return "";

    const dateUtc = new Date(timeStr);
    const dateLocal = new Date(
      dateUtc.getTime() + new Date().getTimezoneOffset() * -60000
    );

    const hours = dateLocal.getHours().toString().padStart(2, "0");
    const minutes = dateLocal.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  // UTC > 2024-12-01 06:57
  utcTimeToLocalFormat(utcTimeStr: string): string {
    const utcDate = new Date(utcTimeStr);
    const localDate = new Date(
      utcDate.getTime() + new Date().getTimezoneOffset() * -60000
    );
    return localDate.toISOString().slice(0, 16).replace("T", " ");
  }

  // UTC > 12/01(日)
  utcTimeToLocalMMddFormat(utcTimeStr: string): string {
    const utcDate = new Date(utcTimeStr);
    const localDate = new Date(
      utcDate.getTime() + new Date().getTimezoneOffset() * -60000
    );

    const mm = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const dd = localDate.getDate().toString().padStart(2, "0");
    const weekday = localDate.toLocaleDateString("zh-TW", { weekday: "short" }); // e.g., "日", "一", ...

    return `${mm}/${dd}(${weekday})`;
  }

  getUTCFormattedDateTime(): string {
    const now = new Date();

    const pad = (n: number, width = 2) => n.toString().padStart(width, "0");

    const year = now.getUTCFullYear();
    const month = pad(now.getUTCMonth() + 1);
    const day = pad(now.getUTCDate());

    const hours = pad(now.getUTCHours());
    const minutes = pad(now.getUTCMinutes());
    const seconds = pad(now.getUTCSeconds());

    // 取得毫秒並轉成 6 位數 (微秒表示法)
    const microseconds = pad(now.getUTCMilliseconds(), 3) + "000";

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
  }
}
