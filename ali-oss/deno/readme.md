# S3like Demo of ali-oss (Deno)

需要配置跨域：
+ 来源：*
+ 允许 Methods：PUT
+ 允许 Headers：*

``` bash
deno task dev
```

## 坑
+ 前端程序上传 object 时，发生跨域，此时请求头里的 Date 发不出去，要用 x-oss-date
