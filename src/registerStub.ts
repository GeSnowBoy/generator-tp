import * as yeoman from "yeoman-environment";
import * as fs from "fs";
import * as path from "path";

const env = yeoman.createEnv();
import Generator from "./utils/index";
const templatePath = path.join(__dirname, "../templates/");
const templateNames = fs.readdirSync(templatePath).filter((name) => {
  return fs.statSync(path.join(templatePath, name)).isDirectory();
});
// 注册 yo
templateNames.map((name) => {
  env.registerStub(Generator(name), "tp:" + name);
});
export { env, templateNames, templatePath };
