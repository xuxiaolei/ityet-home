---
title: Github Actions自动发布Release包💯
slug: github-actions-automatically-publish-the-release-bag-z1e73nf
url: /post/github-actions-automatically-publish-the-release-bag-z1e73nf.html
date: '2024-10-31 16:30:40+08:00'
lastmod: '2024-10-31 16:45:25+08:00'
toc: true
isCJKLanguage: true
---

# Github Actions自动发布Release包💯

​`Github Actions`​是一个 CI/CD 工具，可以自动执行代码仓库中的任务，比如构建、测试和部署等。

一张图看懂 github actions 的工作流程：

​![github-actions.png](https://segmentfault.com/img/bVdd65K "github-actions.png")​

它被定义在仓库的`.github/workflows`​目录下，每个流程对应一个`YAML`​文件。可以是`.yml`​或`.yaml`​后缀。

根据流程图我们可以知道需要定义一些关键性字段，我们以前端项目为例。定一个工作流在推送代码后执行构建。

1. 任务触发器，监听到推送`push`​事件后触发。
2. 定义执行的任务，最终执行构建.

    1. 拉取代码
    2. 设置 `node`​ 环境
    3. 安装依赖`npm install`​
    4. 执行脚本`npm run build`​

工作流文件命名为`actions-test.yml`​，可以直接将内容复制到仓库的`.github/workflows`​目录下，文件名可以自定义。保存后，点击仓库的`Actions`​选项卡，即可看到该任务执行情况。:

```
on: [push]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run build
```

​​![image](https://ityet.com/img/image-20241031164245-prsgeix.png)​​

在一个流程里可以配置多个任务，并行执行。任务之间也可以设置依赖关系，比如任务 A 执行完毕后，任务 B 才能开始。

也可以配置多个流程，并行执行。如果流程之间有依赖关系，则可以配置一个流程引用另一个流程，那么这个流程将会等待被引用的流程执行完毕后再执行。

## 基础语法

包括 YAML 语法中使用的关键字及其作用。

* ​`name`​ 工作流名称
* ​`run-name`​ 工作流运行的名称
* ​`on`​ 定义触发工作流的条件  
  可以设置单个或多个触发事件，或设置时间执行计划。还可针对执行设置限制，比如：特定分支、文件、标签等。

  ```
  # 单个事件
  # on: push
  # 多个事件
  on: [push, pull_request, issues]
  ```

  只指定事件时，在事件的不同活动状态都会触发。有些事件没有活动类型，比如`push`​,有些则有比如`issues \ pull_request`​.

  可以通过定义事件活动类型`on.<event_type>.types`​,指定触发工作流事件的类型，比如新建 issue 触发,而不在编辑、删除时触发。

  ```
  on:
    issues:
      types: opened
  ```

  某些事件还具有筛选器，筛选器定义在触发事件时，匹配了过滤器才执行，比如`push`​可以配置筛选器`branches \ branches-ignore`​，使其在特定分支推送时触发。

  ```
  on:
    push:
      branches:
        - "main"
        - "releases/**"
  ```
* 筛选器

  * ​`branches \ branches-ignore`​可被用于`push \ pull_request \ pull_request_target`​事件
  * ​`paths \ paths-ignore`​ 可被用于`push \ pull_request \ pull_request_target`​事件
  * ​`tags \ tags-ignore`​ 可被用于`push`​事件

  ​`branches`​ 指定分支，而`branches-ignore`​ 排除分支。不能同时使用，在使用`branches`​可以使用`!`​进行排除,并且必须包含一个不使用`!`​的分支。

  ```
  on:
    pull_request:
      - "releases/**"
      - "!releases/v1"
  ```

  ​`paths`​ 指定文件路径，而`paths-ignore`​排除文件路径。

  可以同时使用`branches`​和`paths`​,需要同时满足才会触发。

  ```
  on:
    push:
      branches:
        - "main"
      paths:
        - "src/**"
  ```

  匹配定义模式可以使用符号`* \ ** \ + \ ? \ !`​

  而对于`branches`​和`tags`​的使用，它们是或的关系。代码推送或者有新的 tag 标签都会触发。

  ```
  on:
    push:
      branches:
        - "main"
      tag: "*"
  ```
* ​`permissions`​ 定义工作流的操作权限。在修改仓库内容以及仓库设置等都需要设置操作权限。
* ​`defaults`​ 定义工作流中默认设置。比如定义执行脚本语言环境、执行脚本目录等。
* ​`jobs`​ 定义任务  
  定义一个或多个任务。默认所有任务是并行的，可以通过`jobs.<job_id>.needs`​指定任务依赖关系。  
  每个任务要在`run-on`​指定的容器环境中运行。

  ```
  jobs:
    build-test:
      runs-on: ubuntu-latest
  ```

  ​`build-test`​就是定义的任务 id;`ubuntu-latest`​就是`runs-on`​指定的任务运行环境。

  * ​`<job_id>.name`​ 任务名称
  * ​`<job_id>.needs`​ 指定任务依赖关系，必须完成依赖任务才能执行。  
    依赖单个或多个任务。如果依赖的任务失败，则当前任务会跳过执行。

    ```
    jobs:
      job1:
      job2:
        needs: job1
      job3:
        needs: [job1, job2]
    ```
  * ​`<job_id>.if`​ 满足条件时执行任务  
    可以使用上下文环境的变量或表达式，来指定任务是否执行。表达式需要使用`${{}}`​语法，`always()`​表示只要任务完成（不管成功与否），都执行任务。

    ```
    jobs:
      job1:
      job2:
      job3:
        if: ${{ always() }}
        needs: [job1, job2]
    ```
  * ​`<job_id>.runs-on`​ 任务运行环境  
    指定任务运行环境，可以是 github 提供的容器环境，或者自行托管的容器环境。个人开发者使用 github 提供的免费容器环境即可。  
    环境机器有 linux、windows 和 macOS 三种操作系统。

    ```
    jobs:
      job1:
        runs-on: ubuntu-latest
    ```
  * ​`<job_id>.env`​ 定义可用于整个工作流或者单个步骤的变量。
  * ​`<job_id>.steps`​ 定义任务操作步骤  
    每个任务可以包含多个执行步骤，每个步骤都是在独立的进程中执行。所以步骤之间不会保留环境变量的更改。  
    通过以下字段定义步骤：

    * ​`id`​ 步骤 id，可以在上下文中引用步骤。
    * ​`name`​ 步骤名称，
    * ​`uses`​ 引用外部操作  
      选择作为步骤执行的外部操作引用。包括工作流、公共存储库或已发布的 docker 容器镜像中定义的操作。  
      这里我们只关注 github 提供的公共操作,`actions/checkout@v4`​操作就是公共的用来检出仓库代码的操作。`actions/setup-node@v4`​则是用来设置 node 环境。

      ```
      jobs:
        build-test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
      ```
    * ​`run`​ 执行命令  
      用来执行脚本命令，比如`run: npm install`​。可同时执行多个命令

      ```
      - run: |
          npm install
          npm run build
      ```

      当然，也可以分开两个步骤执行。如果执行的命令不在根目录下，还可以通过`working-directory`​设置默认目录，如果想为所有`run`​步骤设置默认目录，则可以在`jobs.<job_id>.defaults.run`​中设置。
    * ​`env`​ 设置环境变量
    * ​`if`​ 满足条件时执行步骤
    * ​`with`​ 定义操作传入的传递参数  
      在使用操作`actions/setup-node@v4`​时，指定 node 版本为 20.

      ```
      jobs:
        build-test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
              with:
                node-version: "20"
      ```
    * ​`timeout-minutes`​ 指定步骤执行超时时间
  * ​`<job_id>.timeout-minutes`​ 指定任务执行超时时间

可以看到有些配置字段一样，但它们所在的作用域不一样。所以文件特别注重书写，根据层级缩进来定义配置字段。**注意键值对之间必须要有空格**

除了上述列出的常见配置字段，还有一些特殊配置，比如`workflow_call`​定义工作流的输入和输出；`<job_id>.outputs`​定义任务输出,可以在另一个任务里使用；`<job_id>.strategy`​可以定义在多个策略下的版本或者系统里运行任务。

## 使用变量

除了执行操作，还可以使用上下文环境提供的变量。比如前面使用过的`always()`​表达式,不管依赖的任务执行是否成功，都会执行当前任务。

```
jobs:
  job1:
  job2:
    needs: job1
  job3:
    if: ${{ always() }}
    needs: [job1, job2]
```

### 默认环境变量

默认环境变量由 GitHub 设置，不能直接被工作流访问，但是可以通过所处的上下文可访问变量访问这些变量。这些以`GITHUB_*`​和`RUNNER_*`​开头的变量，不可以覆盖这些变量。

​`GITHUB_*`​ 可以由上下文变量`github.*`​访问；`RUNNER_*`​ 可以由上下文变量`runner.*`​访问。

* ​`GITHUB_ACTION`​ 运行的操作名称 `github.action`​
* ​`GITHUB_ACTION_PATH`​ 运行的操作路径 `github.action_path`​
* ​`GITHUB_ACTOR`​ 发起工作流程的个人或应用程序名称 `github.actor`​
* ​`GITHUB_EVENT_NAME`​ 触发的工作流事件名称 `github.event_name`​
* ​`RUNNER_OS`​ 运行操作系统的名称 `runner.os`​
* ​`RUNNER_ARCH`​ 运行操作系统的架构 `runner.arch`​

等等 [可以查看详细的变量说明](https://link.segmentfault.com/?enc=57WxbckVtC9yIvRNwsbEkg%3D%3D.dR%2FHyFWGx31eVDHKi35%2F8W0VTypNmS1Q61C0ZosCVJT3yX%2FQWcE1ibRiX4I3P5n0p02Eu31MOM4kWFCryWv75xKZ6zfnbPOMysZefH1xDEbBG8qKAXX%2B4623n1dQB5uF4r6bG%2FixxlvkK80KD7R1%2BRayC1b5mBXf0fK%2Fnlk7qkdCa6V2vKfEXn11QnWuMKfSATqD5H%2Bq0UI7oHmkTvglLQ%3D%3D)

下面的工作流会输出当前操作名称，因为我们没有定义操作`name`​,会输出`__run`​

```
on:
  push:

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - run: echo ${{ github.action }}
```

### 自定义变量

定义自己的变量，可以使用`env`​字段。每个部分都可以定义自己的变量，比如整个工作流、某个任务、某个步骤。

* ​`env`​
* ​`jobs.<job_id>.env`​
* ​`jobs.<job_id>.steps[*].env`​

变量命名规则：包含字母、数字、下划线，不允许空格。不能以数字开头。不区分大小写。

```
on:
  push:

env:
  name: hboot

jobs:
  build-test:
    runs-on: ubuntu-latest
    env:
      age: 18
    steps:
      - run: echo "Say $val to $name. you are $age "
        env:
          val: hello
```

除了直接通过`$`​访问变量外，还可以通过上下文变量`evn`​访问。比如`env.name`​,此时则需要使用`${{}}`​包裹，有些情况下必须这样访问，比如使用`if`​表达式。

### 表达式

之前已经使用过`always()`​表达式。表达式一般用来条件判断，常与`if`​字段结合使用。

通过`${{}}`​对表达式求值。假值(`false \ 0 \ -0 \ "" \ '' \nul`​)都会被转为 false;

```
evn:
  isSave: ${{ "" }}
  isSame: ${{ null }}
```

可以通过运算符进行求值，比如`> \ < \ >= \ <=<span> </span>`​等。字符串比较时会忽略大小写。

内置的一些函数，帮助计算求值。

* 字符串

  * ​`contains(target, searchStr)`​ 判断`target`​是否包含`searchStr`​
  * ​`startsWith(target, searchStr)`​ 判断`target`​是否以`searchStr`​开头
  * ​`endsWith(target, searchStr)`​ 判断`target`​是否以`searchStr`​结尾
  * ​`format(target,replace1, replace2,...,replaceN)`​ 替换`target`​中标记语法`{N}`​包裹的位置内容的。
  * ​`join(arr|str, separator)`​ 将数组或字符串连接为字符串,默认连接符为`,`​
  * ​`toJSON(value)`​ 将值转换为 JSON 字符串
  * ​`fromJSON(value)`​ 将 value 字符串转换为 JSON 数据类型。
  * ​`hashFiles(path)`​ 返回与 path 模式匹配的文件集的哈希集。
* 状态检查

  * ​`success()`​ 之前所有的步骤是否都执行成功。默认的状态检查
  * ​`always()`​ 总是返回 `true`​
  * ​`cancelled()`​ 当前工作流被取消，返回`true`​
  * ​`failure()`​ 之前的步骤都执行失败，返回`true`​

### 上下文

利用上下文变量可以访问一些当前所处的变量数据。比如之前已经使用过的`github.* \ runner.* \ env.*`​。

在使用上下文变量访问时，最好使用表达式`${{}}`​包裹，避免被直接当成普通字符处理。

* ​`github`​ 工作流程运行的相关信息。
* ​`env`​ 工作流、作业或步骤中设置的变量。
* ​`vars`​ 存储库、组织或环境级别上设置的变量集。
* ​`job`​ 当前运行的任务信息。
* ​`jobs`​ 可复用工作流的输出信息。
* ​`steps`​ 当前运行步骤的信息。
* ​`runner`​ 运行器信息。
* ​`secrets`​ 存储库中加密的名称和值。

  * ​`secrets.GITHUB_TOKEN`​ 任务需要访问某些权限功能，需要使用 GitHub 提供的默认令牌。
  * ​`secrets.<name>`​ 其他自定义密码等信息
* ​`needs`​ 可以访问当前任务依赖的所有任务的输出信息。

[更多信息访问](https://link.segmentfault.com/?enc=UCqxJbFUX7znz1KA2XtqlA%3D%3D.ofkhk%2BIJ%2FA9qodNCn7zXhSgdECdhcaXuxWAYXWGqg52tZy3i4YO%2FRHw6AgWcs0qEnjvvFoUJMhUzcynI5Q%2F4iV5bIV4Xzx7MyY7180P7L6rFbqk%2BRdGCXcYxnHDZwO2RMYDBte3v4ndUf4irg0ja%2Fx2Sat2Wn9E98XVbh6DJ%2B7%2FFHjxKccMiL2ZV8FQ4FUrp)

当然上下文的使用也是有时限地方限制的。某些上下文只能在特定字段中使用。

## 创建自己的工作流

了解基本的 Github actions 工作流概念以及字段定义说明，可以创建一个帮助自己构建并发布版本的工作流任务。

拆解，首先需要确定触发条件。~需要在代码推送后检查代码文件~​~`package.json`~​~是否变化，以及内部的属性~​~`version`~​~是否变化。当检测到更改之后就可以执行后续的构建、发布任务了。~

简单点，通过创建一个新的 tag 推送事件发生时才触发工作流。

```
name: version-release

on:
  push:
    branches: main
    tags: "*"
```

但是由于它们是或的关系，为了确切表示只在新 tag 推送时才执行，需要使用`if`​表达式。代码构建、编译之前已经写过了，拿过来直接用。

```
jobs:
  release-build:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && startsWith(github.ref, 'refs/tags')
    steps:
      - name: checkout git code
        uses: actions/checkout@v4
      - name: setup node and use ndoe 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: install and build
        run: |
          npm install
          npm run build
```

构建完成，需要打包压缩。然后调用 github release 的 api 创建一个发布版本。这里我们直接找一个现成的 actions 进行发布`softprops/action-gh-release@v2.0.8`​

```
steps:
  # 先完成构建
  # 压缩
  - name: pacakge dist
    run: |
      tar -czvf rsup-web.tar.gz -C dist .

  - name: create github release
    id: new_release
    uses: softprops/action-gh-release@v2.0.8
    with:
      name: latest
      make_latest: true
      files: rsup-web.tar.gz
```

操作仓库设置需要授权，`softprops/action-gh-release@v2.0.8`​ 内部已经使用了`secrets.token`​密钥变量以及`permissions`​授予的访问权限。

github 仓库不能直接创建一个 tag，需要创建一个 release，顺便创建一个 tag。保存后就可以看到`Actions`​中触发了`version-release`​.等待执行完毕，可以看到在之前创建的 release 中已经上传了打包压缩了的文件。

​​![image](https://ityet.com/img/image-20241031164259-96wc0n9.png)​​

那之后我们在本地开发，待每次发时新建一个 tag，推送到仓库，就可以自动构建并发布版本了。

```
$> git tag v0.0.2

# 推送到仓库
$> git push origin v0.0.2
```

为了保证我们每次发送的版本都是固定的下载地址，我们发布时固定 tag 为`latest`​。 指定 actions 入参`tag_name: latest`​

```
- name: create github release
  uses: softprops/action-gh-release@v2.0.8
  with:
    tag_name: latest
    name: ${{github.ref_name}}
```

## 比较实用的 actions

[更多 actions 可查看](https://link.segmentfault.com/?enc=CWL0Fx%2Flffmm3zr7e%2FOAHQ%3D%3D.ceJit1HAItWb%2FrlDCLEyBqlWqp0zPDQZLMvNuzr0ZRAdrggzg30Mtpthj9gzUJ0X)

* ​`actions/checkout@v4`​ 拉取代码
* ​`actions/setup-node@v4`​ 安装 node 环境
* ​`softprops/action-gh-release@v2`​ 发布 github releases
* ​`actions/cache@v4`​ 缓存一些资源。比如 `node_modules`​避免下一次构建时重复安装。
* ​`peter-evans/create-pull-request@v7`​ 创建 pull request
* ​`pnpm/action-setup@v4.0.0`​ 安装 pnpm 包管理工具
* ​`JS-DevTools/npm-publish@v3`​ 发布 npm 包
* ​`actions-rs/toolchain@v1`​ 安装 rust 环境

## 参考资料

[GitHub Actions](https://link.segmentfault.com/?enc=RHy1bAAKP2ydK6CVzm%2Bp%2BQ%3D%3D.GyyYevtTnc9TEeUrXyKf%2F8FRbCUy2gAUBZNoDF%2BVI5oV9jgas2LHr%2BjTVXjK6SFeVEr6MdjewwkvvmkM7HGCvNGrrkRt2qSgD%2BhpyRk%2BMVM%3D)
