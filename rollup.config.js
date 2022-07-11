export default {
  input: "./src/index.js", // 入口
  output: [
    {
      format: "umd", // 打包为umd通用格式,兼容了amd和CommonJS,可在浏览器或node环境运行
      file: "dist/index.js", //输出目录及文件名
      name: "index.js",
    },
  ],
};
