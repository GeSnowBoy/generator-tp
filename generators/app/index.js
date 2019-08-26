const fs = require('fs');
const Generator = require('yeoman-generator');
function isDir(path) {
  try {
    var stat = fs.statSync(path);
    return stat && stat.isDirectory();
  } catch (e) {
    return false;
  }
}
class CatchConfig {
  constructor() {
    this.value = require('./config.json');
  }
  get() {
    return this.value.templateFiles;
  }
  set(value) {
    this.value.templateFiles = value;
    this.save();
  }
  save() {
    return fs.writeFileSync(
      __dirname + '/config.json',
      JSON.stringify(this.value),
      'utf8'
    );
  }
}
class MyGenerator extends Generator {
  copyDir(proxyDir, targetDir) {
    var stat = fs.statSync(proxyDir);
    if (stat) {
      if (stat.isDirectory()) {
        fs.readdirSync(proxyDir).map(filename => {
          this.copyDir(
            proxyDir + '/' + filename,
            targetDir + '/' + filename.replace('__', this.props.dirName)
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
module.exports = class extends MyGenerator {
  //  initializing - 您的初始化方法（检查当前项目状态，获取配置等）
  async initializing() {
    this.props = {};
    this.catchConfig = new CatchConfig();
    if (!isDir(this.catchConfig.get())) {
      this.catchConfig.set(this.templatePath());
    }
  }

  async prompting() {
    let t = await this.prompt([
      {
        type: 'list',
        name: 'templatePath',
        message: '请选择要拷贝的仓库:',
        choices: ['自带模板', this.catchConfig.get(), '自定义目录']
      }
    ]);
    this.props.templatePath = t.templatePath;

    if (this.props.templatePath == '自定义目录') {
      let t = await this.prompt([
        {
          type: 'input',
          name: 'templatePath',
          message: '请输入复制路径',
          validate: v => {
            if (!isDir(v)) {
              return ` [${v}] 不是文件夹`;
            }
            return true;
          }
        }
      ]);
      this.catchConfig.set(t.templatePath);
      this.props.templatePath = t.templatePath;
    } else if (this.props.templatePath == '自带模板') {
      this.props.templatePath = this.templatePath();
    }
    let temp = await this.prompt([
      {
        type: 'list',
        name: 'templateName',
        message: '请选择要拷贝的文件:',
        choices: fs.readdirSync(this.props.templatePath)
      }
    ]);
    var temp2 = await this.prompt([
      {
        type: 'input',
        name: 'dirName',
        message: '请输入目录名称',
        default: temp.templateName
      }
    ]);

    this.props = { ...this.props, ...temp, ...temp2 };
  }
  async writing() {
    this.copyDir(
      this.props.templatePath + '/' + this.props.templateName,
      this.destinationPath(this.props.dirName)
    );
  }
};
/* configuring- 保存配置并配置项目（创建.editorconfig文件和其他元数据文件）
default - 如果方法名称与优先级不匹配，则将其推送到该组。
writing - 编写生成器特定文件（路由，控制器等）的位置
conflicts - 处理冲突的地方（内部使用）
install - 安装运行的地方（npm，bower）
end - 最后称呼，清理，说再见等 */
