import glob from "glob";

export const cwd = process.cwd();

let _controllerGlob: string | undefined = undefined;
let _serviceGlob: string | undefined = undefined;

export const setServiceGlob = (value: string) => {
  _serviceGlob = value;
};

export const setControllerGlob = (value: string) => {
  _controllerGlob = value;
};

export const getAllControllerPaths = () =>
  new Promise<string[]>((rs, rj) => {
    if (!_controllerGlob) return rs([]);
    glob(_controllerGlob, (err, files) => {
      if (err) return rj(err);
      rs(files);
    });
  });

export const getAllServicePaths = () =>
  new Promise<string[]>((rs, rj) => {
    if (!_serviceGlob) return rs([]);
    glob(_serviceGlob, (err, files) => {
      if (err) return rj(err);
      rs(files);
    });
  });
