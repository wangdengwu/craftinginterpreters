> 你必须要有一张地图，无论它是多么粗糙，否则你会到处乱逛。
> 在《指环王》中，我从未让任何人在一天里走得距离超出他力所能及的范围。
>
> <cite>J.R.R.托尔金</cite>

我们不想到处流浪，所以在我们出发之前，让我们先仔细观察一下以前的编程语言实现者所绘制的领域地图，它将帮助我们了解我们要去哪里以及其他人采取的备选路线.

首先，我先做个简单说明。本书的大部分内容都是关于编程语言*实现*的，与*编程语言本身*这种柏拉图式的理想形式有所不同。
比如“栈”，“字节码”和“递归下降”是一种特定实现使用的基本组件。从用户的角度来说，只要最终产生的装置能够忠实地遵循编程语言的规范，它内部的都是实现细节。

我们将会花很多时间在这些细节上，所以如果我每次提及的时候都写“编程语言*实现*”，我的手指都会被磨掉。
相反，除非有重要的区别，否则我将使用“编程语言”来指代一种编程语言或该编程语言的一种实现，或两者皆有。

## 编程语言的组成部分

自计算机的黑暗时代以来，工程师们就一直在构建编程语言。 
一旦我们可以操作计算机时，我们发现构建编程语言太难了，所以我们应该感谢他们的帮助。
我觉得很有趣的是，即使今天的机器确实快了一百万倍，并且拥有更多数量级的存储空间，我们构建编程语言的方式几乎没有改变。

尽管编程语言设计师所探索的领域非常辽阔，但他们实现语言的路径却<span name="dead">很少</span>。
并非每种语言都采用完全相同的路径 -- 有些会采用一种或两种捷径 -- 但另外的都很相似。

从海军少将格蕾丝·赫柏实现的第一个COBOL编译器开始，一直到一些热门的，新的，转义为JavaScript的众多语言，其“文档”完全由某个Git仓库中的一个编辑不佳的README组成。

<aside name="dead">

那里确实有绝径，引用数为零的悲惨小众CS论文以及如今被遗忘的优化方法，这些优化方法只有在以字节为单位来衡量内存时才有意义。

</aside>

我形象化的把实现一个编程语言可能选择的路径网络类比为爬山。
你从山底开始，这时程序只是原始的源文本，实际上只是一串字符。
每个阶段都会对程序进行分析，并将其转换为更高层次的表示形式，将使语义（作者想让计算机做什么）更加明确。

最终我们达到山顶，我们有了用户程序的全局视角，明白了他们代码的*含义*。我们开始下山的另一边，
我们将这个最高层次表示，逐步转换为底层形式，越来越接近机器指令即我们知道的如何让CPU真正执行的指令。

<img src="image/a-map-of-the-territory/mountain.png" alt="语言实现可能采用的爬山路径" class="wide" />

让我们追踪每一条路径和兴趣点。 我们的旅程从左侧的用户源代码的纯文本开始：

<img src="image/a-map-of-the-territory/string.png" alt="var average = (min + max) / 2;" />

### 扫描

第一步是**扫描**，也就是所谓的**词法**，或者叫(如果你想给某人留下深刻印象)**词法分析**，它们差不多是一个意思。
我喜欢“词法”因为它听起来像一个邪恶的超级恶棍会做的事情，但是我还是会用“扫描”，因为它看起来更常见一些。

**扫描**(或**词法**)接受线性字符流并将它们组合成一系列更类似于<span name="word">“单词”</span>的东西。
在编程语言中，每一个这样的单词叫做“词法单元”，有一些词法单元是单个字符，比如`(`和`,`另外的可能由多个字符组成，比如数字(`123`)，字符串(`"hi!"`)，以及标识符(`min`)。 

<aside name="word">

"Lexical"来自希腊语词根“lex”，意思是“单词”。

</aside>

有一些字符在源文件中其实是没有含义的，空格就可以忽略，还有注释，根据语言规范，这些都将被忽略。扫描通常都无视这些，只留下干净有序的词法单元。

<img src="image/a-map-of-the-territory/tokens.png" alt="[var] [average] [=] [(] [min] [+] [max] [)] [/] [2] [;]" />

### 语法分析

下一步是**语法分析**。这就是我们从句法中得到**文法**的地方-- 用较小的部分组成较大的表达式和语句的能力。
你有没有在英语课上图解过句子？如果有，那就是词法分析要做的。除了英语拥有成千上万的“关键词”和大量的歧义，编程语言则简单的多。

语法分析将一系列词法单元组装成一棵树状结构，这棵树反映了语法的嵌套性质。
这些语法树还有另外两个名字--**解析树**或**抽象语法树**--取决于它们与源语言的基本句法结构的接近程度。在实践中，编程语言人员通常叫它们**语法树**，**ASTs**，或者直接叫**树**。

<img src="image/a-map-of-the-territory/ast.png" alt="An abstract syntax tree." />

语法分析器在计算机科学中有着悠久而丰富的历史，它与人工智能界有着密切的联系。
很多今天使用的分析编程语言的技术，最初都来源于分析人类语言，其研究者构建的目的是，试着让计算机和我们对话。

事实证明，对于那些解析器可以处理的严格语法来说，人类语言太混乱了, 但它们非常适合更简单的编程语言人工语法。唉，我们这些有缺陷的人类依然无法完全正确的使用这些简单的语法，所以语法分析的任务还包括当我们做错时让我们知道**语法错误**。

### 静态分析

在所有实现中，前两个阶段都非常相似。现在，每种语言的个体特征开始发挥作用。
至此，我们知道了代码的语法结构 -- 诸如哪些表达式嵌套在其中之类的东西 -- 但是我们知道的也就仅限于此了。

比如在像`a + b`这样的表达式中，我们知道我们要把`a`和`b`相加，但是我们不知道这些名字指向哪里，它们是局部变量？全局变量？它们在哪定义的。

大多数语言做的第一点分析叫**绑定**或**解析**。对于每一个**标识符**，我们找出变量名是在哪定义的，并关联起来，
这就是**作用域**的作用 -- 在一块代码区域中，一个确定的命名被用来指向一个确定的声明。

如果语言是<span name="type">静态类型的</span>,我们就可以做类型检查，一旦我们知道`a`和`b`在哪里声明的，我们就可以确定它们的类型。
然后如果这些类型不支持互相累加操作，我们就会报告一个**类型错误**。

<aside name="type">

我们在本书中构建的编程语言是动态类型的，因此将在稍后的运行时中进行类型检查。

</aside>

深吸一口气，我们已经到达了山顶，并对用户的程序有了全面的了解。
所有这些从语义分析中得到的语义信息都需要存储在某个地方。我们可以把它藏在几个地方：

* 通常，它会被直接存储在语法树本身的**属性**中 -- 在解析时没有初始化的节点的额外字段，但在稍后会被填充。

* 有时，我们可能会将数据存储在外部的查找表中。通常，该表的关键字是标识符，即变量和声明的名称。
  在这种情况下，我们称其为**符号表**并且其中与每个键关联的值告诉我们该标识符所指的是什么。

* 最强大的记录工具是将树转化为一个全新的数据结构，更直接地表达代码的语义。这是下一节的内容。

到目前为止，所有内容都被视为实现的**前端**，你可能会猜至此以后都是**后端**，其实不然。
在过去的年代，当“前端”和“后端”被创造出来时，编译器要简单得多。后来，研究人员在前端和后端之间引入了新阶段。
遵循旧的习惯, 威廉·沃尔夫及其公司将新的阶段命名为**中端**。

### 中间表示

你可以把编译器看成是一条流水线，每个阶段的工作是把代表用户代码的数据组织起来，使下一阶段的实现更加简单。流水线的前端是针对程序所使用的源语言编写的。后端关注的是程序运行的最终架构

在中间阶段，代码可能被编译为一些<span name="ir">**中间表示**</span> (**IR**)，
其和源代码或者最终结果之间都没有紧密关系（所以叫中间），相反，IR扮演了这2种语言之间桥梁的角色。

<aside name="ir">

有一些成熟的 IR 风格，打开你选择的搜索引擎并查找“控制流图”、“静态单一赋值”、“继续传递样式”和“三地址代码”。

</aside>

这可以让你更轻松地支持多种源语言和多种目标平台。假设你想实现Pascal、C和Fortran编译器，并且你想针对x86、ARM，还有SPARC体系结构开发编译器。通常情况下，这意味着你需要写*九*个完整的编译器： Pascal&rarr;x86, C&rarr;ARM，以及其他各种组合。

一个<span name="gcc">共享的</span>中间表示可以大大减少这种情况。你为每个源语言写*一个*前端，生成IR中间表示，然后*一个*后端来处理所有目标结构。现在，你可以将这些混搭起来，得到每一种组合。

<aside name="gcc">

如果你曾经好奇[GCC][]如何支持这么多疯狂的编程语言和体系结构，例如Motorola 68k上的Modula-3，现在你就明白了。 编程语言前端针对的是少数IR，主要是[GIMPLE][]和[RTL][].目标后端如68k，会接受这些IR并生成机器代码。

[gcc]: https://en.wikipedia.org/wiki/GNU_Compiler_Collection
[gimple]: https://gcc.gnu.org/onlinedocs/gccint/GIMPLE.html
[rtl]: https://gcc.gnu.org/onlinedocs/gccint/RTL.html

</aside>

还有一个重要的原因是，我们可能希望将代码转化为某种形式，使语义更加明确...。

### 优化

一旦我们理解了用户程序的含义，我们就可以用另外一个更有效率但是有*相同语义*的不同程序替换它，我们可以**优化**它。

一个简单的例子是**常量折叠**：如果某个表达式求值得到的始终是完全相同的值，我们可以在编译时进行求值，并用其结果替换该表达式的代码。如果用户输入：

```java
pennyArea = 3.14159 * (0.75 / 2) * (0.75 / 2);
```

我们可以在编译器中完成所有的算术运算，并将代码更改为：

```java
pennyArea = 0.4417860938;
```

优化是编程语言业务的重要组成部分。许多编程语言黑客把他们的整个职业生涯都花在了这里，从编译器中榨取每一滴性能，以使他们的基准测试速度提高百分之几。这变成了一种痴迷。

我们在这本书里大部分情况下会<span name="rathole">跳过</span>编译优化，很多成功的语言很少做编译期优化，比如，Lua和CPython生成相对未优化的代码，而把精力放在运行时性能优化上。

<aside name="rathole">

如果你忍不住想一探究竟，一些关键字可以帮助你入门：“持续传播”，“公共子表达式消除”，“循环不变代码外提”，“全局值编号”，“强度折减”，“聚合标量替换”，“死码删除”和“循环展开”。

</aside>

### 代码生成

我们已经将所有可以想到的优化应用到了用户程序中。
最后一步是将其转换为机器可以实际运行的形式。换句话说，**生成代码**（或**代码生成**），这里的“代码”通常是指CPU运行的类似于汇编的原始指令，而不是人类可能想要阅读的“源代码”。

最后，我们到了**后端**,从山的另一边开始下降。
从现在开始，我们的代码表示将变的越来越原始，像逆向进化，因为我们越来越接近机器所能理解的指令。

我们需要做一个决定，我们是为真实CPU还是虚拟CPU生成指令？如果我们生成真实的机器代码，我们得到一个可执行文件，操作系统可以将其直接加载到芯片上。
原生代码的执行速度快如闪电，但生成它需要大量工作。当今的体系结构包含大量指令，复杂的流水线和足够塞满一架波音747飞机行李舱的<span name="aad">历史包袱</span>。

使用特定指令集也意味着你的编译器绑定到特定架构上，如果你的编译器面向[x86][]指令集，它就不能运行在[ARM][]设备上。计算机体系结构爆发前的60年代，缺乏可移植性是很大的障碍。

<aside name="aad">

例如，[AAD][] ("ASCII Adjust AX Before Division")指令可以让你执行除法，这听起来很有用。除了该指令将两个二进制编码的十进制数字作为操作数打包到一个16位寄存器中。*你*最后一次在16位机器上使用BCD是什么时候？

[aad]: http://www.felixcloutier.com/x86/AAD.html

</aside>

[x86]: https://en.wikipedia.org/wiki/X86
[arm]: https://en.wikipedia.org/wiki/ARM_architecture

为了解决这个问题，像BCPL的Martin Richards和Pascal的Niklaus Wirth这样的黑客，分别使他们的编译器生成*虚拟*机器码，取代真实的机器指令。
他们生成了一个假设的、理想化的机器所运行的机器码。Wirth称这种**p-code**为“可移植代码”，但今天，我们通常称它为**字节码**因为每条指令通常都是一个字节长。

这些合成指令的设计是为了更紧密地映射到编程语言的语义上，而不是与任何一种计算机体系结构的特殊性及其积累的历史遗留问题联系在一起。
你可以把它认为是编程语言底层操作的密集二进制编码。

### 虚拟机

如果你编译成了字节码，你的工作还没有结束，因为没有芯片可以执行你的字节码，你还需要转译。
你有两个选择，你可以为每个体系结构写一个小的微编译器，把你的字节码转译成对应的机器代码。
你仍然需要针对你支持的<span name="shared">每种</span>芯片做一些工作，不过这个最后阶段比较简单，你可以复用这部分编译器流水线，只适配你支持的体系结构。
你基本上只是使用你的字节码作为中间表示。

<aside name="shared" class="bottom">

基本原则是，你把特定于体系架构的工作推得越靠后，你就可以在不同架构之间共享更多的早期阶段的成果。
也有一些特例，比如，许多优化，如寄存器分配和指令选择，在了解特定芯片的优势和能力时效果最佳。弄清楚编译器的哪些部分可以共享，哪些应该针对特定芯片是一门艺术。

</aside>

或者你可以写一个<span name="vm">**虚拟机**</span>(**VM**)，一个模拟虚拟芯片来运行你的字节码的程序。
在虚拟机中运行字节码比提前将其翻译成机器代码要慢，因为每条指令每次执行时都必须在运行时模拟。作为回报，你得到的是简单性和可移植性。
比如说用C实现虚拟机，你就可以在任何有C编译器的平台上运行你的语言，这就是我们在本书中构建的第二个解释器的工作原理。

<aside name="vm">

术语“虚拟机”有不同的抽象。“系统虚拟机”在软件中模拟整个硬件平台和操作系统。
**系统虚拟机**在软件中模拟整个硬件平台和操作系统。这就是为什么你可以在Linux机器上玩Windows游戏，
也是为什么云服务商，可以给客户提供控制他们自己的“服务器”的用户体验，而不需要为每个用户分配不同的物理机的原因。

我们这本书里讨论的虚拟机是**语言虚拟机**或**进程虚拟机**，希望你不要搞混。

</aside>

### 运行时

我们终于将用户程序锤炼成可以执行的形式了。最后一步是运行它。如果我们将其编译为机器码，我们只需告诉操作系统加载可执行文件，然后就可以运行了。如果我们将它编译成字节码，我们需要启动VM并将程序加载到其中。

在这两种情况下，对于除了最基础的低级语言之外的所有语言，我们通常需要我们的语言在程序运行时提供一些服务。
比如，如果编程语言是自动管理内存的，我们需要一个垃圾收集器去回收未使用的比特位。如果我们的语言支持
"instance of" 测试，这样你就能知道你有什么类型的对象，那么我们就需要一些表示方法来跟踪执行过程中每个对象的类型。

所有的这些都是在运行时发生的，所以其被理所当然的称为**运行时**。在一个完全编译的语言中，实现运行时的代码会直接插入到生成的可执行文件中。比如说，在[Go][]中，每一个编译好的程序都被植入一份自己的Go运行时。如果语言是在解释器或虚拟机内运行，那么运行时就一直常驻内存。这也就是Java、Python和JavaScript等大多数语言实现的工作方式。

[go]: https://golang.org/

## 捷径和备选路线

这是一条漫长的道路，涵盖了你要实现的每个可能的阶段。许多编程语言的确走完了整条路线，但也有一些捷径和备选路径。

### 单趟编译器

一些简单的编译器将语法分析、语义分析和代码生成交织在一起，这样它们就可以直接在语法分析器中生成输出代码，而无需分配任何语法树或其他IR。这些<span name="sdt">**单趟编译器**</span>限制了编程语言的设计。你没有中间数据结构来存储程序的全局信息，也不会重新访问任何之前语法分析过的代码部分。这意味着，一旦你看到某个表达式，就需要足够的知识来正确地对其进行编译。

<aside name="sdt">

[**语法制导翻译**][pass]是一种结构化的技术，用于构建这些一次性编译器。 You associate an *action* with each piece of the
grammar, usually one that generates output code. Then, whenever the parser
matches that chunk of syntax, it executes the action, building up the target
code one rule at a time.
你把相应的*操作*附加到每一条语法规则上，然后生成相应代码。所以，每当解析器匹配到对应语法块时，它就会执行操作，按照每条规则一步一步构建目标代码。

[pass]: https://zh.wikipedia.org/wiki/%E8%AF%AD%E6%B3%95%E5%88%B6%E5%AF%BC%E7%BF%BB%E8%AF%91

</aside>

Pascal和C语言就是围绕这个限制而设计的。在当时，内存非常珍贵，一个编译器可能连整个*源文件*都无法存放在内存中，更不用说整个程序了。这也是为什么Pascal的语法要求类型声明要放在一个块的最前面。这也是为什么在C语言里，在调用函数之前没有定义它，就不能编译通过，除非你在调用函数之前有明确的声明，来告诉编译器它需要怎么生成代码，后续函数才能调用。

### 树遍历解释器

有些编程语言在将代码语法分析为AST后就开始执行代码（可能应用了一点静态分析）。运行程序，解释器依次遍历语法树的每个分支和叶子结点，然后对每个节点进行表达。

这种实现风格在学生项目和小型语言中很常见，但在<span name="ruby">通用</span>编程语言中并不广泛使用，因为它往往很慢。有些人使用“解释器”仅指这类实现，但其他人对“解释器”一词的定义更宽泛，因此我将使用没有歧义的**树遍历解释器**来指代这些实现。我们的第一个解释器就是这样工作的。

<aside name="ruby">

一个明显的例外是早期版本的Ruby，它是树遍历解释器。在Ruby 1.9时，Ruby的规范实现从最初的MRI（“Matz's Ruby Interpreter”）切换到了Koichi Sasada的YARV（“Yet Another Ruby VM”）。YARV是一个字节码虚拟机。

</aside>

### 转译器

为一种语言<span name="gary">编写</span>一个完整的后端可能需要大量的工作。如果你有一些现有的通用IR作为目标，则可以将前端转换到该IR上。否则，你可能会陷入困境。但是，如果你将某些其他*源语言*视为中间表示，会怎么样？

你为你的编程语言编写了一个前端，然后，在后端，为了避免将语义编译为低级目标语言而做大量工作，你可以转换成其它语言合法的源代码，这样，你就可以使用*那个*语言现有的编译工具，编译出可执行文件，从而不需要从头到尾实现全部编译过程。

人们过去称之为**源到源编译器**或者**转换编译器**随着那些为了在浏览器中运行而编译成JavaScript的各类语言的兴起，它们有了一个时髦的名字**转译器**。

<aside name="gary">

第一个转译器XLT86将8080汇编语言转换为8086汇编语言。
这看似简单，但请记住8080是8位芯片，而8086是16位芯片，可以将每个寄存器用作一对8位寄存器。
XLT86进行了数据流分析，以跟踪源程序中的寄存器使用情况，然后将其有效地映射到8086的寄存器集。

它是由悲惨的计算机科学英雄加里·基尔达尔（Gary Kildall）撰写的。他是最早认识到微型计算机前景的人之一，他创建了PL/M和CP/M，这是当时最早的高级语言和操作系统。

他是一名船长、企业主、有执照的飞行员和摩托车手。还是一名电视节目主持人，拥有着克里斯克里斯托弗森式的外表，和潇洒的大胡子，在80年代拉风无比。他直到死于神秘的摩托车酒吧之前，都在与比尔·盖茨较量，并像许多人一样输了。他死得太早了，但死之前也过着地狱般的生活。

</aside>

虽然第一个转译器是将一种汇编语言翻译成另一种汇编语言，
今天，大多数转译器都专注在高级语言，随着UNIX的普及，开始了一个悠久的转译器传统，即转译器以C语言作为输出语言。C编译器在任何UNIX操作系统上都有，所以把C语言作为输出，可以让你的语言运行在各种各样的体系结构上。

现在，Web浏览器就像“机器”一样，其"机器语言"就是JavaScript,所以现在似乎[几乎所有的语言][js]都有一个以JS为目标的转译器，因为这是让你的代码在浏览器中运行的<span name="js">主要</span>方式。

[js]: https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js

<aside name="js">

JS曾经是在浏览器中执行代码的唯一方式。多亏了[WebAssembly][]，编译器现在有了第二种可以在Web上运行的低级语言。

[webassembly]: https://github.com/webassembly/

</aside>

转译器的前端（扫描器和语法分析器）看起来跟其他编译器相似。然后，如果源语言只是在目标语言之上包装的简单语法外壳，则它可能会完全跳过分析，并直接输出目标语言中的类似语法。

如果两种语言的语义差异较大，那么你就会看到完整编译器的更多典型阶段，包括分析甚至优化。然后，在代码生成阶段，无需输出一些像机器代码一样的二进制语言，而是生成一串语法正确的目标语言源码（好吧，目标代码）。

不管是哪种方式，通过目标语言的编译器编译，你可以运行最终代码，看起来还不错。

### 即时编译

最后一条与其说是捷径，不如说是最危险的高山争夺战，最好留给专家。执行代码最快的方法是将代码编译成机器代码，但你可能不知道你的最终用户的机器支持什么架构。该怎么做呢？

你可以做和HotSpot JVM、Microsoft的CLR和大多数JavaScript解释器相同的事情。
在终端用户的机器上，当程序加载时（无论是从JS中还是从源代码加载，或者是JVM和CLR的平台无关的字节码），都可以将其编译为对应的本机的机器代码，以适应本机支持的体系结构。
自然地，这被称为**即时编译**。大多数黑客称之为"JIT"，其发音与“fit”押韵。

大多数尖端JIT插入分析工具到生成的代码里，来发现哪些地方是最可能的性能关键，以及什么样的数据流过它们。然后，随着时间的推移，<span
name="hot">热点</span>它们会使用更高级的优化来自动重新编译这部分热点。

<aside name="hot">

当然，这正是HotSpot JVM名称的来源。

</aside>

## 编译器和解释器

现在我已经向你的脑袋里塞满了一大堆编程语言术语，我们终于可以解决一个自远古以来一直困扰着程序员的问题：编译器和解释器之间有什么区别？

事实上这就像问水果和蔬菜的区别一样。这似乎是一个二选一的选择，但实际上“水果”是一个植物学术语，“蔬菜”是烹饪学术语。一个并不意味着对另一个的否定。有不是蔬菜的水果（苹果），也有不是水果的蔬菜（胡萝卜），也有既是水果又是蔬菜的可食用植物，比如西红柿。

<span name="veg"></span>

<img src="image/a-map-of-the-territory/plants.png" alt="A Venn diagram of edible plants" />

<aside name="veg">

花生（连真正的坚果都算不上）和小麦等谷类其实都是水果，但我把这个图画错了。怎么说呢，我是个软件工程师，不是植物学家。我也许应该抹掉这个花生小家伙，但他太可爱了，我不忍心。

另一方面，现在*松子*是植物性食物，既不是水果也不是蔬菜。至少据我所知是这样。

</aside>

好，回到编程语言上：

* **编译**是一种*实现技术* -- 将源语言翻译成其他语言 -- 通常是较低级的形式。当你生成字节码或机器代码时，你就是在编译。当你翻译成另一种高级语言时，你也是编译。

* 当我们说语言实现"是**编译器**"时，是指它会将源代码转换为其他形式，但不会执行。用户需要自己运行它以获得输出结果。

* 相反，当我们说一个实现"是**解释器**"是，是指它接受源代码并立即执行它。输入源码即可执行。

像苹果和橘子一样，某些实现显然是编译器，而*不是*解释器。 GCC和Clang把你的C代码编译为机器代码。最终用户直接运行该可执行文件，甚至可能永远都不知道使用了哪个工具来编译它。所以这些是C语言*编译器*。

在Matz的旧版本的Ruby规范实现中，用户从源代码中运行Ruby。该实现通过遍历语法树对其进行语法分析并直接执行。期间都没有发生其他的转换，无论是在实现内部还是以任何用户可见的形式。所以这绝对是一个Ruby解释器。

但是CPython呢？当你使用它运行你的Python程序时，代码会被语法分析并转换为内部字节码格式，然后在虚拟机内部执行。从用户的角度来看，这显然是一个解释器 --
他们是从源代码开始运行自己的程序。但如果你看一下CPython的内部实现，你会发现肯定有一些编译工作在进行。

答案是两者<span name="go">兼而有之</span>。CPython *是一个解释器，但它也*有*编译器。实际上，大多数脚本语言都以这种方式工作，如你所见：

<aside name="go">

[Go工具链][go]甚至更进一步，如果你运行`go build`，它编译你的Go源码到机器码，如果你执行`go run`，它也会编译，并立即执行生成的可执行程序。

所以`go`*是*编译器(你可以使用它编译代码，而不运行代码)，也*是*解释器(你可以运行它立即执行源代码)，内部*也*有编译器(当你把它当做解释器时,它仍然在内部编译)。

[go tool]: https://golang.org/cmd/go/

</aside>

<img src="image/a-map-of-the-territory/venn.png" alt="A Venn diagram of compilers and interpreters" />

中间那个重叠的区域也是我们第二个解释器所在的位置，因为它会在内部将编程语言编译成字节码。所以，虽然本书名义上是关于解释器的，但我们也会涉及一些编译的内容。

## 我们的旅程

一下子有太多东西要消化掉。别担心。这一章并不是要求你*理解*所有这些零碎的内容。我只是想让你们知道它们是存在的，以及大致了解它们是如何组合在一起的。

当您探索本书所采用的指导路径之外的领域时，这张地图应该会为您提供很好的服务。我想要让你渴望独自出击，在那座山上流浪。

但是，现在，是我们自己的旅程开始的时候了。系好你的鞋带，背好你的包，走吧。从<span name="here">这里</span>开始，所有你需要关注的是你眼前的路。

<aside name="here">

从现在开始，我保证尽量少用爬山来做比喻。

</aside>

<div class="challenges">

## 挑战

1. 选择一个你喜欢的编程语言的开源实现。下载源代码，并在其中探索。试着找到实现扫描器和语法分析器的代码，它们是手写的，还是用Lex和Yacc等工具生成的？(存在`.l`或`.y`文件通常意味着后者)

2. 及时编译往往是提升动态类型编程语言性能最好的方法，但并不是所有的语言都使用它。有什么理由不采用JIT呢？

3. 大多数可编译为C的Lisp实现也包含一个解释器，该解释器还使它们能够随时执行Lisp代码。为什么？

</div>
