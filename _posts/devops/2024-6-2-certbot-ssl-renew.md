---
layout: blog
istop: true
title: "SSL通配符证书的自动申请更新"
background-image: ../img/17260397848891_3zeSuVrfA4LI7U41uUXtzw.png
date:  2024-03-15 13:45:56
category: devops
tags:
- https
- ssl
---

# 准备工作

首先确保自己有域名的增、删权限，这是个必要条件。

本人测试环境：群晖DS220+

Let's Encrypt 的证书需要用到官方工具 [certbot](https://certbot.eff.org/docs/install.html)，安装很简单：

```yum
yum install certbot -y
certbot --version
```

目前测试用的是最新版本 0.26.1。尽量使用最新版本的，以前刚推出通配符域名时是 0.22.x 版本，有些地方有 bug，比如 --dry-run 命令跟 --server 会有冲突。

# 理解验证的流程

申请证书必须要经过验证才能生效，一般验证的方法有几种，官方文档都有介绍：《[Getting certificates (and choosing plugins)](https://certbot.eff.org/docs/using.html#getting-certificates-and-choosing-plugins)》

验证非通配符域名，也就是普通单域名时，一般选择常用方法是 **webroot**，也就是可以往网站的根目录放验证文件进行验证（类似微信公众号开发），比较简单易用。或者是使用 **standalone** 方法，开启一个应用服务器验证（可能会跟 Apache、NGINX 有冲突）。

但是通配符域名验证，只能用 **DNS plugins** 的方式

> This category of plugins automates obtaining a certificate by modifying DNS records to prove you have control over a domain. Doing domain validation in this way is the only way to obtain wildcard certificates from Let's Encrypt.

这种方式说白了，就是根据提示增加某个 TXT 记录的域名，然后记录值是一串验证字符。有点类似 **webroot**，只不过是在域名上写值而非自己服务器上写验证文件。

来看看申请通配符证书的命令行：
```
certbot certonly \
--email your-email@example.com \
--agree-tos \
--preferred-challenges dns \
--server https://acme-v02.api.letsencrypt.org/directory \
--manual \
-d yourdomain.com \
-d *.yourdomain.com
```

__

我们来拆解下命令行的意思，

* **certonly** 获取或更新证书，但是不安装到本机。这个参数默认是 run，即获取或更新证书并安装。另一个值是 renew，即更新证书。
* **--email** 接收有关账户的重要通知的邮箱地址，非必要，建议最好带上
* **--agree-tos** 同意 ACME 服务器的订阅协议
* **--preferred-challenges dns** 以 DNS Plugins 的方式进行验证
* **--server <https://acme-v02.api.letsencrypt.org/directory>** 指定验证服务器地址为 acme-v02 的，因为默认的服务器地址是 acme-v01 的，不支持通配符验证
* **--manual** 采用手动交互式的方式验证
* **-d yourdomain.com -d \*.yourdomain.com** 指定要验证的域名。注意，不带 www 的一级域名 yourdomain.com，和通配符二级域名 \*.yourdomain.com 都要写，如果只写 \*.yourdomain.com 生成出来的证书是无法识别 yourdomain.com 的

然后按回车执行，根据提示就能进行验证了，详细步骤参考：[Let's Encrypt 终于支持通配符证书了](https://www.jianshu.com/p/c5c9d071e395)》中的实践那部分。

# 自动验证

Let's Encrypt 有规定，证书 90 天后会过期，会提前一个月发邮件通知（如果申请时有填写通知邮箱）。到时候又得经历一次重新申请的经历。一直这样**手动验证**是不太合理的，得想办法**自动更新**才行。

所以我研究了文档和网上找资料，发现官方也有提供方法释放你的双手，这个东西叫 [validation hooks](https://certbot.eff.org/docs/using.html#pre-and-post-validation-hooks)。

通过图理解 hook 的流程（图片来自网上）\
![17260397848891_3zeSuVrfA4LI7U41uUXtzw.png](https://fastly.jsdelivr.net/gh/xuxiaolei/ityet-home@master/img/17260397848891_3zeSuVrfA4LI7U41uUXtzw.png)

可以看到 DNS 验证方式中，--manual-auth-hook 和 --manual-cleanup-hook 参数是我们的重点。

也就是理解为，增加 TXT 记录的域名和使用完删除这个域名，本来需要我们登录到域名管理后台，手动去操作的，变成了现在由 hook 脚本去做。

这两个 hook 要怎么写呢？首先得你的域名供应商提供有 API 给你操作管理域名，然后参考[官方文档](https://certbot.eff.org/docs/using.html#pre-and-post-validation-hooks)。现在主流的域名供应商应该都有这种 API。我用的是阿里云（万网）的域名，提供有 API，去官方看了[文档](https://help.aliyun.com/document_detail/29739.html)然后自己写出来了，有兴趣的可以参考或者直接使用：<https://github.com/broly8/letsencrypt-aliyun-dns-manual-hook>

好了，我们接着往下走，在原来**手动验证**的命令行，改成：

 ```bash
certbot certonly \
--email your-email@example.com \
--agree-tos \
--preferred-challenges dns \
--server https://acme-v02.api.letsencrypt.org/directory \
--manual \
--manual-auth-hook /path/to/http/authenticator.sh \
--manual-cleanup-hook /path/to/http/cleanup.sh \
-d yourdomain.com \
-d *.yourdomain.com
```

__

**自动验证**的命令行即在原来的基础上增加了两个 hook。

# 关于更新

如果你用了上面我介绍的**自动验证**方式获取的证书，那么要更新证书就很简单了，一条命令搞定：

```bash
certbot renew
```

__

附上两个的可选参数：

* **--force-renewal** 强制更新证书。如果不带这个参数，必须等到快过期（正常是前一个月）才能更新。
* **--quiet** 静默执行，不带有任何提示

如果你以前是用了**手动验证**的方式获取证书的，直接执行 renew，是会报错的，比如让你提供 manual-auth-hook 脚本。要改成**自动验证**方式有两种方法，

方法一：在上面**自动验证**的命令行基础上，加上 --force-renewal 参数，强制再更新一次证书。

```bash
manual_auth_hook = /path/to/http/authenticator.sh
manual_cleanup_hook = /path/to/http/cleanup.sh
```

__

这样执行 renew 操作就不会报错啦。

# 计划任务更新

写个简单的脚本 certrenew.sh

```bash
#!/usr/bin/env bash
echo "[$(date +%Y-%m-%d/%H:%M:%S)]"
certbot renew
systemctl restart nginx
```

加入计划任务 crontab -e

```bash
# 每月15号01:00执行一次更新，并重启nginx服务器
0 1 15 * * /usr/bin/sh /path/to/certrenew.sh >>/path/to/certrenew.sh.log 2>&1
```
