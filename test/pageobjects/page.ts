export abstract class Page {
  async goToSetting() {
    await this.settingTab.click();
  }

  protected async scrollDownTo(text: string, maxAttempts = 10) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (await this.elementBy(text).isDisplayed()) {
        break;
      }
      attempt++;
    }
  }

  protected elementBy(text: string) {
    return $(`android=new UiSelector().textMatches("${text}")`);
  }

  protected get okButtonOnDialog() {
    return $(process.env.ANDROID_OK_BUTTON_XPATH);
  }

  private get settingTab() {
    return $(process.env.ANDROID_SETTING_TAB_ID);
  }
}
