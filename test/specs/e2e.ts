import { albumPage } from "../pageobjects/album.page.ts";
import { settingPage } from "../pageobjects/setting.page.ts";

describe("Automation", () => {
  it("takes screenshots in all languages", async () => {
    await albumPage.goToSetting();
    await settingPage.switchToFrench();
    await albumPage.goToStore();
  });
});
