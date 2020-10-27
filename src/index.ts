import { config } from "dotenv";
import "reflect-metadata";
import { setControllerGlob, setServiceGlob } from "./common/paths";
config();
export * from "./decorators";
export * from "./helpers";
export * from "./route";
export * from "./service";

export interface EMVCConfigs {
  controllers?: string;
  services?: string;
}

const EMVC = {
  config({ controllers, services }: EMVCConfigs) {
    if (controllers) setControllerGlob(controllers);
    if (services) setServiceGlob(services);
  },
};

export default EMVC;
