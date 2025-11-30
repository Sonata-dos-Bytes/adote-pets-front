import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  
  // Configuração do app directory
  appDirectory: "app",
  
  // Configuração para ignorar requisições de assets
  serverModuleFormat: "esm",
} satisfies Config;
