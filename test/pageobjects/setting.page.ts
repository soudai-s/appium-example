import { Page } from "./page.ts";

class SettingPage extends Page {
  async switchToFrench() {
    await this.scrollDownTo(process.env.ANDROID_LANGUAGE_SETTING_TEXT);
    await this.languageSetting.click();
    await this.frenchOnLanguageModal.click();
    await this.okButtonOnDialog.click();
  }

  private get languageSetting() {
    return this.elementBy(
      driver.isAndroid
        ? process.env.ANDROID_LANGUAGE_SETTING_TEXT
        : process.env.IOS_LANGUAGE_SETTING_TEXT,
    );
  }

  private get frenchOnLanguageModal() {
    return this.elementBy(process.env.FRENCH_TEXT);
  }
}
export const settingPage = new SettingPage();
