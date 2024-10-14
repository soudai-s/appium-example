describe("Automation", () => {
  it("takes screenshots in all languages", async () => {
    await $(process.env.ANDROID_SETTING_TAB_ID).click();
  });
});
