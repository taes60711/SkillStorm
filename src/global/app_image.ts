export class AppImage {
  public static googleLogo = new URL(
    "@/assets/images/google-icon.svg",
    import.meta.url
  ).href;
  public static logo = new URL("@/assets/images/logo.png", import.meta.url)
    .href;
  public static noTextLogo = new URL(
    "@/assets/images/logoNoText.png",
    import.meta.url
  ).href;
  public static defaultUserImg = new URL(
    "@/assets/images/profile/default_avatar.png",
    import.meta.url
  ).href;
}
