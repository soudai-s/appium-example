export abstract class Page {
  async goToStore() {
    await this.storeTab.click();
  }

  async goToSetting() {
    await this.settingTab.click();
  }

  async saveScreenshot(language: string) {
    await this.sleep();
    await driver.saveScreenshot(
      `./tmp/${this.platform.toLowerCase()}-${language}.png`,
    );
  }

  protected get platform() {
    return driver.isAndroid ? "Android" : "iOS";
  }

  protected async sleep(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  protected async scrollDownTo(text: string, maxAttempts = 10) {
    if (driver.isAndroid) {
      const scrollableElementId = await $(
        "android=new UiScrollable(new UiSelector().scrollable(true))",
      ).elementId;
      let attempt = 1;
      while (true) {
        if (maxAttempts < attempt) {
          throw Error(
            `指定した文字列で特定可能な要素が見つかりませんでした。文字列: ${text}`,
          );
        }
        if (attempt <= 3) {
          await driver.execute("mobile: scrollGesture", {
            elementId: scrollableElementId,
            direction: "down",
            percent: 1,
          });
        } else {
          // 4回目以降は目的のElementを通り過ぎて最下部へ到達している可能性が高いため交互に上下させる
          const direction = attempt % 2 === 0 ? "up" : "down";
          await driver.execute("mobile: scrollGesture", {
            elementId: scrollableElementId,
            direction,
            percent: 1,
          });
        }

        // スクロール直後だと描画が間に合わずfalseが返る場合があるためスリープを入れる
        await this.sleep();

        if (await this.elementBy(text).isDisplayed()) {
          break;
        }
        attempt++;
      }
    } else {
      const predicateString = this.predicateStringWith(text);
      driver.executeScript("mobile: scroll", [
        { direction: "down", predicateString },
      ]);
    }
  }

  protected elementBy(text: string) {
    return $(
      driver.isAndroid
        ? `android=new UiSelector().textMatches("${text}")`
        : `-ios predicate string: ${this.predicateStringWith(text)}`,
    );
  }

  protected predicateStringWith(text: string) {
    return `name = "${text}" OR label = "${text}" OR value = "${text}"`;
  }

  protected get okButtonOnDialog() {
    return $(process.env.ANDROID_OK_BUTTON_XPATH);
  }

  protected async launchIosApp() {
    await driver.executeScript("mobile: launchApp", [
      { bundleId: process.env.IOS_BUNDLE_IDENTIFIER },
    ]);
    this.sleep(500);
  }

  private get settingTab() {
    return $(
      driver.isAndroid
        ? process.env.ANDROID_SETTING_TAB_ID
        : process.env.IOS_SETTING_TAB_ID,
    );
  }

  private get storeTab() {
    return $(process.env.ANDROID_STORE_TAB_ID);
  }
}
