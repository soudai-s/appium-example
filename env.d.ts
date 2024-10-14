declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ANDROID_DEVICE_NAME: string;
      readonly ANDROID_APP_PACKAGE: string;
      readonly ANDROID_APP_ACTIVITY: string;

      readonly IOS_DEVICE_NAME: string;
      readonly IOS_PLATFORM_VERSION: string;
      readonly IOS_UNIQUE_DEVICE_IDENTIFIER: string;
      readonly IOS_BUNDLE_IDENTIFIER: string;

      readonly ANDROID_STORE_TAB_ID: string;
      readonly ANDROID_SETTING_TAB_ID: string;
      readonly ANDROID_LANGUAGE_SETTING_TEXT: string;
      readonly ANDROID_OK_BUTTON_XPATH: string;

      readonly FRENCH_TEXT: string;
    }
  }
}

export {};
