import { albumPage } from "../pageobjects/album.page.ts";

describe("Automation", () => {
  it("takes screenshots in all languages", async () => {
    await albumPage.goToSetting();
  });
});
