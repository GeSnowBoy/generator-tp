import { Command } from "commander";
import { env, templateNames, templatePath } from "./registerStub";
const pgk = require("../package.json");
export const program = new Command();
program
  .version(pgk.version, "-v, --version", "查看版本号")
  .option("-l, --list ", "可用模板列表");
function logTemplateFileList() {
  console.log("模板列表有:");
  console.log("");
  templateNames.map((name) => {
    console.log(name);
  });
}
program.action((options) => {
  if (options.list) {
    logTemplateFileList();
  } else {
    console.log("没有此命令,请有输入 tp -h 查看详情");
  }
});
program
  .command("select <source>")
  .alias("s")
  .description("选择一个模板列表去复制")
  .action((source, options) => {
    if (templateNames.includes(source)) {
      env.run(`tp:${source}`, () => {
        console.log(`操作完成`);
      });
    } else {
      console.error(`没有 ${source} 模板,请检查`);
      console.log();
      logTemplateFileList();
    }
  });

program.parse(process.argv);
