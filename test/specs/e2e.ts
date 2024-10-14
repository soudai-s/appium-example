import { albumPage } from "../pageobjects/album.page.ts";
import { settingPage } from "../pageobjects/setting.page.ts";
import { storePage } from "../pageobjects/store.page.ts";

describe("Automation", () => {
  it("takes screenshots in all languages", async () => {
    await albumPage.goToSetting();
    await settingPage.switchToFrench();
    await albumPage.goToStore();
    await storePage.saveScreenshot("french");
  });
});
