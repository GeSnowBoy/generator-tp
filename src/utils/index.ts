import * as fs from "fs";
import * as Generator from "yeoman-generator";
import * as path from "path";

class MyGenerator extends Generator {
  props: { [K: string]: any } = {};
  name: string = "app";
  copyDir(proxyDir, targetDir) {
    var stat = fs.statSync(proxyDir);
    if (stat) {
      if (stat.isDirectory()) {
        fs.readdirSync(proxyDir).map((filename) => {
          this.copyDir(
            proxyDir + "/" + filename,
            targetDir + "/" + filename.replace("__", this.props.dirName)
          );
        });
      } else {
        this.fs.copyTpl(proxyDir, targetDir, this.props);
      }
    } else {
      this.log(`${proxyDir}路径不存在`);
    }
  }
}
export default (name: string) =>
  class extends MyGenerator {
    async initializing(options) {
      this.name = name;
      this.sourceRoot(path.join(__dirname, "../../templates/" + this.name));
    }
    async prompting() {
      this.props.templatePath = this.templatePath();
      let temp = await this.prompt([
        {
          type: "list",
          name: "templateName",
          message: "请选择要拷贝的文件:",
          choices: fs.readdirSync(this.props.templatePath),
        },
      ]);
      var temp2 = await this.prompt([
        {
          type: "input",
          name: "dirName",
          message: "请输入目录名称",
          default: temp.templateName,
        },
      ]);

      this.props = { ...this.props, ...temp, ...temp2 };
    }
    async writing() {
      this.copyDir(
        this.props.templatePath + "/" + this.props.templateName,
        path.join(this.contextRoot, this.props.dirName)
      );
    }
  };
