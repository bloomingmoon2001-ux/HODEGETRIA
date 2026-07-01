import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ru.spaceguide.app",
  appName: "Одигитрия",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
