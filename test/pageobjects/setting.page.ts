import { Page } from "./page.ts";

class SettingPage extends Page {
  async switchToFrench() {
    await this.scrollDownTo(process.env.ANDROID_LANGUAGE_SETTING_TEXT);
    await this.languageSetting.click();
    if (driver.isAndroid) {
      await this.frenchOption.click();
      await this.okButtonOnDialog.click();
    } else {
      await this.preferredLanguageOnPreference.click();
      await this.frenchOption.click();
      await this.launchIosApp();
    }
  }

  private get languageSetting() {
    return this.elementBy(
      driver.isAndroid
        ? process.env.ANDROID_LANGUAGE_SETTING_TEXT
        : process.env.IOS_LANGUAGE_SETTING_TEXT,
    );
  }

  private get frenchOption() {
    return this.elementBy(process.env.FRENCH_TEXT);
  }

  private get preferredLanguageOnPreference() {
    return this.elementBy(process.env.IOS_PREFERRED_LANGUAGE_TEXT);
  }
}
export const settingPage = new SettingPage();
