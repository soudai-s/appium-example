export abstract class Page {
  async goToSetting() {
    await this.settingTab.click();
  }

  private get settingTab() {
    return $(process.env.ANDROID_SETTING_TAB_ID);
  }
}
