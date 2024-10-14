declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ANDROID_DEVICE_NAME: string;
      readonly ANDROID_APP_PACKAGE: string;
      readonly ANDROID_APP_ACTIVITY: string;

      readonly ANDROID_SETTING_TAB_ID: string;
      readonly ANDROID_LANGUAGE_SETTING_TEXT: string;
      readonly ANDROID_OK_BUTTON_XPATH: string;

      readonly FRENCH_TEXT: string;
    }
  }
}

export {};
