#### 创建分支

    $ git checkout -b iss53
    Switched to a new branch 'iss53'
    //这相当于执行下面这两条命令：

    $ git branch iss53
    $ git checkout iss53

[分支教程](http://iissnan.com/progit/html/zh/ch3_2.html)

####典型的工作模式

* 长期分支
* 特性分支:一个特性分支是指一个短期的，用来实现单一特性或与其相关工作的分支。

######请务必牢记这些分支全部都是本地分支，这一点很重要。当你在使用分支及合并的时候，一切都是在你自己的 Git 仓库中进行的 — 完全不涉及与服务器的交互。


####远程分支 [细节](http://iissnan.com/progit/html/zh/ch3_5.html)
######它是对远程仓库中的分支的索引。是一些无法移动的本地分支；只有在 Git 进行网络交互时才会更新。远程分支就像是书签，提醒着你上次连接远程仓库时上面各分支的位置

* 查看方式：比如我们想看看上次同 origin 仓库通讯时 master 分支的样子，就应该查看 origin/master 分支。
* 只要自己不和服务器通讯，自己本地的 origin/master 指针仍然保持原位不会移动

######同步远程数据
    git fetch origin //来同步远程服务器上的数据到本地

######该命令首先找到 origin 是哪个服务器（本例为 git.ourcompany.com），从上面获取你尚未拥有的数据，更新你本地的数据库，然后把 origin/master 的指针移到它最新的位置上。

* 如果有其他服务器，可以用git remote add 命令把它加为当前项目的远程分支之一。

######具体步骤如下
    git remote add teamone
    git fetch teamone  // 简单地创建一个名为 teamone/master 的远程分支



####推送远程分支

######和其他人分享某个本地分支，你需要把它推送到一个你拥有写权限的远程仓库。只推送那些协同工作要用到的特性分支。

######有个serverfix 的分支需要和他人一起开发,我要推送到远程仓库中
    $ git push origin serverfix
    Counting objects: 20, done.
    Compressing objects: 100% (14/14), done.
    Writing objects: 100% (15/15), 1.74 KiB, done.
    Total 15 (delta 5), reused 0 (delta 0)
    To git@github.com:schacon/simplegit.git
     * [new branch]      serverfix -> serverfix


###### 也可以这样传，方便记忆删除远程分支

     git push origin serverfix:serverfix 
     //“上传我本地的 serverfix 分支到远程仓库中去，仍旧称它为 serverfix 分支”

###### 他人同步远程数据的时候，会发现我的分支
    //（当你的协作者再次从服务器上获取数据时，他们将得到一个新的远程分支 origin/serverfix，并指向服务器上 serverfix 所指向的版本）

    $ git fetch origin
    remote: Counting objects: 20, done.
    remote: Compressing objects: 100% (14/14), done.
    remote: Total 15 (delta 5), reused 0 (delta 0)
    Unpacking objects: 100% (15/15), done.
    From git@github.com:schacon/simplegit
     * [new branch]      serverfix    -> origin/serverfix


####注意：在 fetch 操作下载好新的远程分支之后，你仍然无法在本地编辑该远程仓库中的分支。换句话说，在本例中，你不会有一个新的 serverfix 分支，有的只是一个你无法移动的 origin/serverfix 指针。

######下载到本地的新分支自己要合并到当前分支，便于协作
    git merge origin/serverfix

######如果想要一份自己的 serverfix 来开发，可以在远程分支的基础上分化出一个新的分支来：

    //git checkout -b [分支名] [远程名]/[分支名]
    $ git checkout -b serverfix origin/serverfix
    Branch serverfix set up to track remote branch serverfix from origin.
    Switched to a new branch 'serverfix'
    //这样就可以自己接着开发了



####跟踪远程分支，从远程分支 checkout 出来的本地分支，称为 跟踪分支 (tracking branch) 即以上的例子


* 跟踪分支是一种和某个远程分支有直接联系的本地分支。
* 在跟踪分支里输入 git push，Git 会自行推断应该向哪个服务器的哪个分支推送数据。
* 在这些分支里运行 git pull 会获取所有远程索引，并把它们的数据都合并到本地分支中来。


######要为本地分支设定不同于远程分支的名字，只需在第一个版本的命令里换个名字
        $ git checkout -b sf origin/serverfix
        Branch sf set up to track remote branch serverfix from origin.
        Switched to a new branch 'sf'

####删除远程分支

######如果不再需要某个远程分支了，比如搞定了某个特性并把它合并进了远程的 master 分支（或任何其他存放稳定代码的分支）
    //git push [远程名] :[分支名] 没有带任何删除字符啊
    $ git push origin :serverfix
    To git@github.com:schacon/simplegit.git
    - [deleted]         serverfix


####注意：记住我们不久前见过的  语法。删除就是把本地分支给落下
    git push [远程名] [本地分支]:[远程分支]    //这是上传分支到远程仓库
    //如果省略 [本地分支]，在这里提取空白然后把它变成  [远程分支]。



##分支的衍和 （rebase）11月25日 [参考图片](http://iissnan.com/progit/html/zh/ch3_6.html)
 
######rebase 命令，把在一个分支里提交的改变移到另一个分支里重放一遍，衍合能产生一个更为整洁的提交历史

    $ git rebase master server

    //跳过server分支直接将client 合并到 master
    $ git rebase --onto master server client
* 使用衍合的目的，是想要得到一个能在远程分支上干净应用的补丁。


####注意：一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行衍合操作。解释没看明白


##git 协议 [链接](http://iissnan.com/progit/html/zh/ch4_1.html)

    四种主要的协议来传输数据：本地传输，SSH 协议，Git 协议和 HTTP 协议。

*1* 本地协议（Local protocol）

* 所谓的远程仓库在该协议中的表示，就是硬盘上的另一个目录
* 例如：团队每一个成员都对一个共享的文件系统（例如 NFS）拥有访问权

######使用一个共享的文件系统，就可以在一个本地文件系统中克隆仓库，推送和获取
    $ git clone /opt/git/project.git 
    //远程仓库的路径作为 URL 使用
    //Git 会尝试使用硬链接或直接复制它所需要的文件

######要添加一个本地仓库local_proj作为现有 Git 项目的远程仓库
    $ git remote add local_proj /opt/git/project.git

*2* SSH 协议：最常见的，唯一一个同时支持读写操作的网络协议。

######通过 SSH 克隆一个 Git 仓库
    $ git clone ssh://user@server/project.git


*3* Git 协议

*4* Http协议：这个自己看着觉得类似于nginx服务器配置


##在服务器上部署git（新兵训练营里有运用过）  [学习链接](http://iissnan.com/progit/html/zh/ch4_2.html)

*1* 把现有仓库导出为裸仓库 ,裸仓库的目录名一般以 .git 结尾

    $ git clone --bare my_project my_project.git
    //my_project.git 目录中已经有了一份 Git 目录数据的副本

*2* 把裸仓库移到服务器上,把它放到服务器上并设定相关协议

    //假设一个域名为 git.example.com 的服务器已经架设好，并可以通过 SSH 访问，我们打算把所有 Git 仓库储存在 /opt/git 目录下。只要把裸仓库复制过去。
    $ scp -r my_project.git user@git.example.com:/opt/git
    //scp 命令： 从 本地 复制到 远程  scp -r 文件夹 远程目录

*3* 所有对该服务器有 SSH 访问权限，并可读取 /opt/git 目录的用户都可以用下面的命令克隆该项目

    $ git clone user@git.example.com:/opt/git/my_project.git

*4* 某个 SSH 用户对 /opt/git/my_project.git 目录有写权限，那他就有推送权限。

    $ ssh user@git.example.com   //ssh协议的服务器
    $ cd /opt/git/my_project.git //找到远程仓库
    $ git init --bare --shared // 执行此操作 Git 会自动修改该仓库目录的组权限为可写

*5* 我们假设用来共享仓库的服务器已经安装了 SSH 服务，而且你通过它访问服务器。如何让团队的每个人都有访问权？

* 最佳方法：主机上建立一个 git 账户，让每个需要写权限的人发送一个 SSH 公钥，然后将其加入 git 账户的 ~/.ssh/authorized_keys 文件。所有人都将通过 git 账户访问主机。



##生成ssh公钥 [参考链接](http://iissnan.com/progit/html/zh/ch4_3.html)

####内容比较熟悉啊！
* 大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。
* 系统中的每个用户都必须提供一个公钥用于授权。
* SSH 公钥默认储存在账户的主目录下的 ~/.ssh 目录

######查看公钥是否存在
    $ cd ~/.ssh
    $ ls
    authorized_keys2  id_dsa       known_hosts
    config            id_dsa.pub

    //windwos系统下亲测

    G:\git1001 [master ↕ +8 ~1 -0 !]> cd ~/.ssh
    C:\Users\user\.ssh> ls
        目录: C:\Users\user\.ssh
    Mode                LastWriteTime         Length Name
    ----                -------------         ------ ----
    -a----        2016/10/1      9:28           1675 github_rsa
    -a----        2016/10/1      9:28            391 github_rsa.pub

######关键是看有没有用 something 和 something.pub 来命名的一对文件，这个 something 通常就是 id_dsa / id_rsa。有 .pub 后缀的文件就是公钥，id_dsa / id_rsa文件是密钥。

######注意了：如果查看没有这些文件，或者连. .ssh 目录都没有，可以用 ssh-keygen 来创建。该程序在 Linux/Mac 系统上由 SSH 包提供。

    $ ssh-keygen //关键语句
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/schacon/.ssh/id_rsa):
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /Users/schacon/.ssh/id_rsa.
    Your public key has been saved in /Users/schacon/.ssh/id_rsa.pub.
    The key fingerprint is:
    43:c5:5b:5f:b1:f1:50:43:ad:20:a6:92:6a:1f:9a:3a schacon@agadorlaptop.local

######它先要求你确认保存公钥的位置（.ssh/  id_rsa），然后它会让你重复一个密码两次，如果不想在使用公钥的时候输入密码，可以留空。

######把它们的公钥给你或者 Git 服务器的管理员（假设 SSH 服务被设定为使用公钥机制）。他们只需要复制 . pub 文件的内容然后发邮件给管理员。
   
    $ cat ~/.ssh/id_rsa.pub //cat 命令查看公钥
    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
    GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
    Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
    t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
    mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
    NrRFi9wrf+M7Q== schacon@agadorlaptop.local

######最后要把这一长串内容添加到github  / gitlab上自己对于账号的add  ssh上
    ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
    GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
    Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
    t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
    mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
    NrRFi9wrf+M7Q== schacon@agadorlaptop.local

###### 要填写一个邮箱名字： schacon@agadorlaptop.local （就是在公钥最后部分的邮箱名）

####具体步骤参见新兵训练营里的自己的教程


##架设服务器 [参考链接](http://iissnan.com/progit/html/zh/ch4_4.html)
####基于Ubuntu 这样的标准 Linux 发行版 的服务器端架设 SSH 访问的流程如下

####基于前两天看的最佳方法：主机上建立一个  git 账户，让每个需要写权限的人发送一个  SSH 公钥，然后将其加入 git 账户的 ~/.ssh/authorized_keys 文件。所有人都将通过 git 账户访问主机。

*1* 首先，创建一个名为 'git' 的用户，并为其创建一个 .ssh 目录。

    $ sudo adduser git  //该操作要设置用户密码
    $ su git
    $ cd
    $ mkdir .ssh

    //在linux操作系统中，对用户的管理命令：useradd和adduser。两者区别如下
    1.adduser会提示设置密码，而useradd不会。
    2.adduser会创建用户目录，比如/home/freebird  freebird是用户，useradd不会
    3.adduser会创建用户组，默认和用户名相同
    4.adduser会询问全名，房间号码，电话号码等用户信息，useradd不会。
    新内核的linux操作系统，建议使用useradd命令来管理用户

* adduser[adduser参考链接](http://www.ahlinux.com/start/cmd/392.html)
* su命令用于切换当前用户身份到其他用户身份，变更时须输入所要变更的用户帐号与密码。


*2* 把开发者的 SSH 公钥添加到这个用户的 .ssh/authorized_keys 文件中。

* 那么问题来了，authorized_keys文件是怎么来的呢？
* 嗯，可以用 ssh-keygen 来创建。具体参考前两天的笔记[参考链接](http://iissnan.com/progit/html/zh/ch4_3.html)

*2.1* 查看临时文件夹里的公钥

    $ cat /tmp/id_rsa.john.pub //cat查看ssh公钥
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCB007n/ww+ouN4gSLKssMxXnBOvf9LGt4L
    ojG6rs6hPB09j9R/T17/x4lhJA0F3FR1rP6kYBRsWj2aThGw6HXLm9/5zytK6Ztg3RPKK+4k
    Yjh6541NYsnEAZuXz0jTTyAUfrtU3Z5E003C4oxOj6H0rfIF1kKI9MAQLMdpGW1GYEIgS9Ez
    Sdfd8AcCIicTDWbqLAcU4UpkaX8KyGlLwsNuuGztobF8m72ALC/nLF6JLtPofwFBlgc+myiv
    O7TCUSBdLQlgMVOFq1I2uPWQOkOWQAHukEOmfjy2jctxSDBQ220ymjaNsHT4kgtZg2AYYgPq
    dAv8JggJICUvax2T9va5 gsg-keypair

*2.2* 把john，josie，jessica他们的公钥逐个追加到 authorized_keys 文件尾部
    
    $ cat /tmp/id_rsa.john.pub >> ~/.ssh/authorized_keys
    $ cat /tmp/id_rsa.josie.pub >> ~/.ssh/authorized_keys
    $ cat /tmp/id_rsa.jessica.pub >> ~/.ssh/authorized_keys

*3* 用 --bare 选项运行 git init来建立一个裸仓库，初始化一个不包含工作目录的仓库

    $ cd /opt/git
    $ mkdir project.git
    $ cd project.git
    $ git --bare init

*4* Join，Josie 或者 Jessica 就可以把它加为远程仓库，推送一个分支，从而把第一个版本的项目文件上传到仓库里了。

*4.1* 以 gitserver 作为 git 用户及项目仓库所在的主机名，在网络内部运行该主机，并在 DNS 中设定 gitserver 指向该主机。
    
    # 在 John 的电脑上
    $ cd myproject
    $ git init
    $ git add .
    $ git commit -m 'initial commit'
    $ git remote add origin git@gitserver:/opt/git/project.git
    $ git push origin master

*4.2* 其他协作者的克隆和推送
    

    //克隆
    $ git clone git@gitserver:/opt/git/project.git

    //推送README
    $ cd project
    $ vim README
    $ git commit -am 'fix for the README file'
    $ git push origin master

####用这个方法可以很快捷地为少数几个开发者架设一个可读写的    Git 服务(ssh协议可读可写)


*5* 额外的防范措施：用 Git 自带的 git-shell 工具限制 git 用户的活动范围。

###### 将 Git 自带的 git-shell 工具设为 git 用户登入的 shell，那么该用户就无法使用普通的 bash 或者 csh 这类的 shell 程序。

*5.1* 编辑 /etc/passwd 文件：

    $ sudo vim /etc/passwd

*5.2* 在文件末尾将其修改

    git:x:1000:1000::/home/git:/bin/sh              //默认值

    // 把 bin/sh 改为 /usr/bin/git-shell 
    //用 which git-shell 查看它的实际安装路径  根据自己的实际情况修改

    git:x:1000:1000::/home/git:/usr/bin/git-shell    //最后修改效果

######现在 git 用户只能用 SSH 连接来推送和获取 Git 仓库，而不能直接使用主机 shell。尝试普通 SSH 登录的话，会看到下面这样的拒绝信息：

    $ ssh git@gitserver
    fatal: What do you think I am? A shell?
    Connection to gitserver closed.



##1129日自己上传文件碰到的问题： [最终解决方案](http://blog.csdn.net/xzz_hust/article/details/8916668)_


    Windows PowerShell
    版权所有 (C) 2016 Microsoft Corporation。保留所有权利。

######G:\git1001 [master ↕ +9 ~1 -0 !]> git add '1129'
######G:\git1001 [master ↕ +14 ~0 -0 | +8 ~1 -0 !]> git commit -m '1129task'
        [master e13516b] 1129task
         14 files changed, 1312 insertions(+)
         create mode 100644 1129/koch/images/bg.png
         create mode 100644 1129/koch/images/drop.svg
         create mode 100644 1129/koch/images/temper.png
         create mode 100644 1129/koch/images/waterdrop.png
         create mode 100644 1129/koch/index.html
         create mode 100644 1129/koch/js/dropdown.js
         create mode 100644 1129/koch/js/fractalmv.js
         create mode 100644 1129/koch/js/gradient.js
         create mode 100644 1129/koch/js/htree.js
         create mode 100644 1129/koch/js/js.js
         create mode 100644 1129/koch/js/koch.js
         create mode 100644 1129/koch/js/pythagoras.js
         create mode 100644 1129/koch/js/requestNextAnimationFrame.js
         create mode 100644 1129/koch/style/style.css
######G:\git1001 [master ↕ +8 ~1 -0 !]> git push origin master

    //报错  
    To https://github.com/LianJion/fractal.git
     ! [rejected]        master -> master (non-fast-forward)
    error: failed to push some refs to 'https://github.com/LianJion/fractal.git'
    hint: Updates were rejected because the tip of your current branch is behind
    hint: its remote counterpart. Integrate the remote changes (e.g.
    hint: 'git pull ...') before pushing again.
    hint: See the 'Note about fast-forwards' in 'git push --help' for details.


######解决方案：
######G:\git1001 [master ↕ +8 ~1 -0 !]> git push -f origin master
    Counting objects: 33, done.
    Delta compression using up to 4 threads.
    Compressing objects: 100% (31/31), done.
    Writing objects: 100% (33/33), 110.02 KiB | 0 bytes/s, done.
    Total 33 (delta 7), reused 0 (delta 0)
    remote: Resolving deltas: 100% (7/7), completed with 1 local objects.
    To https://github.com/LianJion/fractal.git
     + 898e2d1...e13516b master -> master (forced update)

######成功啦！
######之后再上传别的文件可以直接使用git   push

######git add 多个文件名字，用逗号隔开，多个文件可以用空格来隔开     逗号/ 空格
######G:\git1001 [master ≡ +8 ~1 -0 !]> git add 1128fractal,1128kochmv, kochpro

    warning: LF will be replaced by CRLF in 1128kochmv/koch/js/roundedRectangle.js.
    The file will have its original line endings in your working directory.
    warning: LF will be replaced by CRLF in 1128kochmv/koch/js/slider.js.
    The file will have its original line endings in your working directory.
    G:\git1001 [master ≡ +32 ~0 -0 | +8 ~1 -0 !]> git commit -m '1128'
    [master acc2171] 1128
     32 files changed, 3579 insertions(+)
     create mode 100644 1128fractal/images/bg.png
     create mode 100644 1128fractal/images/drop.svg
     create mode 100644 1128fractal/images/temper-01.png
     create mode 100644 1128fractal/images/temper.png
     create mode 100644 1128fractal/images/temperc.png
     create mode 100644 1128fractal/images/waterdrop.png
     create mode 100644 1128fractal/index.html
     create mode 100644 1128fractal/js/fractal.js
     create mode 100644 1128fractal/js/gradient.js
     create mode 100644 1128fractal/js/js.js
     create mode 100644 1128fractal/js/koch.js
     create mode 100644 1128fractal/js/pythagoras.js
     create mode 100644 1128fractal/js/requestNextAnimationFrame.js
     create mode 100644 1128fractal/js/tree.js
     create mode 100644 1128fractal/style/style.css
     create mode 100644 1128kochmv/koch/images/bg.png
     create mode 100644 1128kochmv/koch/images/drop.svg
     create mode 100644 1128kochmv/koch/images/temper.png
     create mode 100644 1128kochmv/koch/images/waterdrop.png
     create mode 100644 1128kochmv/koch/index.html
     create mode 100644 1128kochmv/koch/js/gradient.js
     create mode 100644 1128kochmv/koch/js/js.js
     create mode 100644 1128kochmv/koch/js/koch.js
     create mode 100644 1128kochmv/koch/js/kochalone.js
     create mode 100644 1128kochmv/koch/js/kochcartoon.js
     create mode 100644 1128kochmv/koch/js/kochdrop.js
     create mode 100644 1128kochmv/koch/js/requestNextAnimationFrame.js
     create mode 100644 1128kochmv/koch/js/roundedRectangle.js
     create mode 100644 1128kochmv/koch/js/slider.js
     create mode 100644 1128kochmv/koch/js/test.js
     create mode 100644 1128kochmv/koch/style/style.css
     create mode 100644 kochpro/koch.js
    G:\git1001 [master ↑ +8 ~1 -0 !]> git push 
    Counting objects: 26, done.
    Delta compression using up to 4 threads.
    Compressing objects: 100% (24/24), done.
    Writing objects: 100% (26/26), 19.86 KiB | 0 bytes/s, done.
    Total 26 (delta 8), reused 0 (delta 0)
    remote: Resolving deltas: 100% (8/8), completed with 1 local objects.
    To https://github.com/LianJion/fractal.git
       e13516b..acc2171  master -> master
    G:\git1001 [master ≡ +8 ~1 -0 !]>


##公共访问：比如说托管一些开源项目--- -->设置简单的匿名读取权限。[链接](http://iissnan.com/progit/html/zh/ch4_5.html)
* 对小型的配置来说最简单的办法就是运行一个静态 web 服务。
* 把它的根目录设定为 Git 仓库所在的位置，然后开启 post-update 挂钩

*1* 仓库现在处于 /opt/git 目录，主机上运行着 Apache 服务（可以是任何web服务器,nginx,这里以apche为例，我们用的是nginx）

*2* 开启挂钩：post-update 

######挂钩的作用：当通过 SSH 向服务器推送时，Git 将运行这个 git-update-server-info 命令来更新匿名 HTTP 访问获取数据时所需要的文件。

    $ cd project.git
    $ mv hooks/post-update.sample hooks/post-update
    //mv命令用来对文件或目录重新命名，或者将文件从一个目录移到另一个目录。这里是重命名？
    $ chmod a+x hooks/post-update
    // chmod命令用来变更文件或目录的权限 
    // a:即全部的用户，包含拥有者，所属群组以及其他用户
    // x:执行或切换权限
    // a+x:允许任何用户执行权限

###### 我们可以查看下post-update文件的内容
    $ cat .git/hooks/post-update
    #!/bin/sh
    #
    # An example hook script to prepare a packed repository for use over
    # dumb transports.
    #
    # To enable this hook, rename this file to "post-update".
    #
    exec git-update-server-info

*3* 在 Apache 配置文件中添加一个 VirtualHost 条目，把文档根目录设为 Git 项目所在的根目录。
    
    //不同服务器不同配置
    <VirtualHost *:80>
        ServerName git.gitserver
        DocumentRoot /opt/git
        <Directory /opt/git/>
            Order allow, deny
            allow from all
        </Directory>
    </VirtualHost>

######注意：nginx配置教程在新兵训练营的参考链接里
*4* 把 /opt/git 目录的 Unix 用户组设定为 www-data 。这样 web 服务才可以读取仓库内容(因为运行 CGI 脚本的 Apache 实例进程默认就是以该用户的身份起来的)

    $ chgrp -R www-data /opt/git

    //chgrp命令用来改变文件或目录所属的用户组  
    // -R 递归处理，将指令目录下的所有文件及子目录一并处理；
    //将/opt/git的用户组全改成www-data

*5* 重启 Apache 之后，即可通过项目的 URL 来克隆该目录下的仓库了。

    $ git clone http://git.gitserver/project.git


####以上步骤可以在几分钟内为相当数量的用户架设好基于   HTTP 的读取权限。

##GitWeb: 提供了Git版本库的图形化web浏览功能
* Git 自带一个叫做 GitWeb 的 CGI 脚本 [体验站点](http://git.kernel.org)



######1206 自己在本地仓库里修改了文件，要更新的话还是要走一波三部曲

        git add "xxx"
        git commit -m "xxx"
        git push origin velocity


###### 1207 发现自己的分支里的文件基于master，里面的文件太多了。其实应该新建一个项目才是，分支里面本来就是有原来主分支里的文件的。诶

*1* 删除分支里面不想要的文件夹，本来想只删除远程里的文件夹的，结果本地的也删除了。。。

*1.1* 删除rm命令: [rm参考资料](http://classfoo.com/ccby/article/KkGHbSF)

    git rm -r --cached 1201 1204 1205
    //删除1201 1204 1205这三个文件。

* -r 进入某个目录中，执行此语句，会删除该目录下的所有文件和子目录。
* --cached 不删除物理文件，仅将该文件从缓存中删除，就是只删除远程文件夹

*1.2* 删除具体某个文件

    git rm --cached "路径+文件名"
    git rm --cached 1128kochmv/koch/images/bg.png

###### 这里涉及到查看路径
    git ls-files
    //查看结果如下
    1128kochmv/koch/images/bg.png

###### 我在这里碰到了一个问题：
    fatal: pathspec 'cached' did not match any files

###### 解决方案： git rm --cached 1128kochmv/koch/images/bg.png ,--cached中 --和cached之间没有空格啊！

*1.3* 删除完了要提交
        
    git commit -m "remove the 1128fractal"

*1.4* 提交完了要push
    
    git push origin svg

*1.5* 然后便完成了我自己想的远程文件夹的删除，本地文件夹的保留？你在逗我！
    
    //我要切换回主分支的时候报错了！！！就是在你以为大功告成的时候拖你下水。
    G:\git1001 [svg +17 ~1 -0 !]> git checkout master

    error: The following untracked working tree files would be overwritten by checkout:
            1128kochmv/koch/images/bg.png
            1128kochmv/koch/images/drop.svg
            1128kochmv/koch/images/temper.png
            1128kochmv/koch/images/waterdrop.png
            1128kochmv/koch/index.html
            1128kochmv/koch/js/gradient.js
            1128kochmv/koch/js/js.js
            1128kochmv/koch/js/koch.js
            1128kochmv/koch/js/kochalone.js
            1128kochmv/koch/js/kochcartoon.js
            1128kochmv/koch/js/kochdrop.js
            1128kochmv/koch/js/requestNextAnimationFrame.js
            1128kochmv/koch/js/roundedRectangle.js
            1128kochmv/koch/js/slider.js
            1128kochmv/koch/js/test.js
            1128kochmv/koch/style/style.css
        Please move or remove them before you switch branches.
        Aborting

###### 网上找了解决方案？excuse  me ?
    git clean  -d  -fx ""

    x  -----删除忽略文件已经对git来说不识别的文件
    d  -----删除未被添加到git的路径中的文件
    f  -----强制运行



    G:\git1001 [svg +17 ~1 -0 !]> git clean  -d  -fx ""
    //执行效果如下
        Removing .README.md.swp
        Removing .test.rb.swp
        Removing ".\357\200\272wa.swp"
        Removing 1128kochmv/
        Removing 1129/
        Removing 1201/
        Removing 1204/
        Removing 1205/
        Removing drop/
        Removing forgotten_file/
        Removing gitlearn.html
        Removing kochpro/
        Skipping repository simplegit-progit/
        Removing test.rb
        Skipping repository ticgit/
        Removing tree.jpg
        Removing tree/

###### 结果？ 嗯，我本地文件夹也没了。。。

[涉世未深，没有看完参考资料](http://stackoverflow.com/questions/4858047/the-following-untracked-working-tree-files-would-be-overwritten-by-checkout)

###### 有时间再各个斟酌吧！



