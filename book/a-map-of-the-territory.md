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

Some characters in a source file don't actually mean anything.
有一些字符在源文件中其实是没有含义的，空格就可以忽略，还有注释，根据语言规范，这些都将被忽略。扫描通常都无视这些，只留下干净有序的词法单元。

<img src="image/a-map-of-the-territory/tokens.png" alt="[var] [average] [=] [(] [min] [+] [max] [)] [/] [2] [;]" />

### 语法分析

下一步是**语法分析**。这就是我们从句法中得到**文法**的地方-- 用较小的部分组成较大的表达式和语句的能力。
你有没有在英语课上图解过句子？如果有，那就是词法分析要做的。除了英语拥有成千上万的“关键词”和大量的歧义，编程语言则简单的多。

词法分析将一系列词法单元组装成一棵树状结构，这棵树反映了语法的嵌套性质。
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

一个<span name="gcc">共享的</span>中间表示可以大大减少这种情况。你为每个源语言写*一个*前端*，生成IR中间表示，然后*一个*后端来处理所有目标结构。现在，你可以将这些混搭起来，得到每一种组合。

<aside name="gcc">

如果你曾经好奇[GCC][]如何支持这么多疯狂的编程语言和体系结构，例如Motorola 68k上的Modula-3，现在你就明白了。 编程语言前端针对的是少数IR，主要是[GIMPLE][]和[RTL][].目标后端如68k，会接受这些IR并生成机器代码。

[gcc]: https://en.wikipedia.org/wiki/GNU_Compiler_Collection
[gimple]: https://gcc.gnu.org/onlinedocs/gccint/GIMPLE.html
[rtl]: https://gcc.gnu.org/onlinedocs/gccint/RTL.html

</aside>

还有一个重要的原因是，我们可能希望将代码转化为某种形式，使语义更加明确...。

### 优化

一旦我们理解了用户程序的含义，我们就可以用另外一个更有效率但是有*相同语义*的不同程序替换它，我们可以**优化**它。

个简单的例子是**常量折叠**：如果某个表达式求值得到的始终是完全相同的值，我们可以在编译时进行求值，并用其结果替换该表达式的代码。如果用户输入：

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

If your compiler produces bytecode,
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

We have finally hammered the user's program into a form that we can execute.
我们终于将用户程序锤炼成可以执行的形式了。最后一步是运行它。如果我们将其编译为机器码，我们只需告诉操作系统加载可执行文件，然后就可以运行了。如果我们将它编译成字节码，我们需要启动VM并将程序加载到其中。

在这两种情况下，对于除了最基础的低级语言之外的所有语言，我们通常需要我们的语言在程序运行时提供一些服务。
比如，如果编程语言是自动管理内存的，我们需要一个垃圾收集器去回收未使用的比特位。如果我们的语言支持
"instance of" 测试，这样你就能知道你有什么类型的对象，那么我们就需要一些表示方法来跟踪执行过程中每个对象的类型。

所有的这些都是在运行时发生的，所以其被理所当然的称为**运行时**。在一个完全编译的语言中，实现运行时的代码会直接插入到生成的可执行文件中。比如说，在[Go][]中，每一个编译好的程序都被植入一份自己的Go运行时。如果语言是在解释器或虚拟机内运行，那么运行时就一直常驻内存。这也就是Java、Python和JavaScript等大多数语言实现的工作方式。

[go]: https://golang.org/

## 捷径和备选路线

That's the long path covering every possible phase you might implement. Many
languages do walk the entire route, but there are a few shortcuts and alternate
paths.

### Single-pass compilers

Some simple compilers interleave parsing, analysis, and code generation so that
they produce output code directly in the parser, without ever allocating any
syntax trees or other IRs. These <span name="sdt">**single-pass
compilers**</span> restrict the design of the language. You have no intermediate
data structures to store global information about the program, and you don't
revisit any previously parsed part of the code. That means as soon as you see
some expression, you need to know enough to correctly compile it.

<aside name="sdt">

[**Syntax-directed translation**][pass] is a structured technique for building
these all-at-once compilers. You associate an *action* with each piece of the
grammar, usually one that generates output code. Then, whenever the parser
matches that chunk of syntax, it executes the action, building up the target
code one rule at a time.

[pass]: https://en.wikipedia.org/wiki/Syntax-directed_translation

</aside>

Pascal and C were designed around this limitation. At the time, memory was so
precious that a compiler might not even be able to hold an entire *source file*
in memory, much less the whole program. This is why Pascal's grammar requires
type declarations to appear first in a block. It's why in C you can't call a
function above the code that defines it unless you have an explicit forward
declaration that tells the compiler what it needs to know to generate code for a
call to the later function.

### Tree-walk interpreters

Some programming languages begin executing code right after parsing it to an AST
(with maybe a bit of static analysis applied). To run the program, the
interpreter traverses the syntax tree one branch and leaf at a time, evaluating
each node as it goes.

This implementation style is common for student projects and little languages,
but is not widely used for <span name="ruby">general-purpose</span> languages
since it tends to be slow. Some people use "interpreter" to mean only these
kinds of implementations, but others define that word more generally, so I'll
use the inarguably explicit **tree-walk interpreter** to refer to these. Our
first interpreter rolls this way.

<aside name="ruby">

A notable exception is early versions of Ruby, which were tree walkers. At 1.9,
the canonical implementation of Ruby switched from the original MRI (Matz's Ruby
Interpreter) to Koichi Sasada's YARV (Yet Another Ruby VM). YARV is a
bytecode virtual machine.

</aside>

### Transpilers

<span name="gary">Writing</span> a complete back end for a language can be a lot
of work. If you have some existing generic IR to target, you could bolt your
front end onto that. Otherwise, it seems like you're stuck. But what if you
treated some other *source language* as if it were an intermediate
representation?

You write a front end for your language. Then, in the back end, instead of doing
all the work to *lower* the semantics to some primitive target language, you
produce a string of valid source code for some other language that's about as
high level as yours. Then, you use the existing compilation tools for *that*
language as your escape route off the mountain and down to something you can
execute.

They used to call this a **source-to-source compiler** or a **transcompiler**.
After the rise of languages that compile to JavaScript in order to run in the
browser, they've affected the hipster sobriquet **transpiler**.

<aside name="gary">

The first transcompiler, XLT86, translated 8080 assembly into 8086 assembly.
That might seem straightforward, but keep in mind the 8080 was an 8-bit chip and
the 8086 a 16-bit chip that could use each register as a pair of 8-bit ones.
XLT86 did data flow analysis to track register usage in the source program and
then efficiently map it to the register set of the 8086.

It was written by Gary Kildall, a tragic hero of computer science if there
ever was one. One of the first people to recognize the promise of
microcomputers, he created PL/M and CP/M, the first high-level language and OS
for them.

He was a sea captain, business owner, licensed pilot, and motorcyclist. A TV
host with the Kris Kristofferson-esque look sported by dashing bearded dudes in
the '80s. He took on Bill Gates and, like many, lost, before meeting his end in
a biker bar under mysterious circumstances. He died too young, but sure as hell
lived before he did.

</aside>

While the first transcompiler translated one assembly language to another,
today, most transpilers work on higher-level languages. After the viral spread
of UNIX to machines various and sundry, there began a long tradition of
compilers that produced C as their output language. C compilers were available
everywhere UNIX was and produced efficient code, so targeting C was a good way
to get your language running on a lot of architectures.

Web browsers are the "machines" of today, and their "machine code" is
JavaScript, so these days it seems [almost every language out there][js] has a
compiler that targets JS since that's the <span name="js">main</span> way to get
your code running in a browser.

[js]: https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js

<aside name="js">

JS used to be the *only* way to execute code in a browser. Thanks to
[WebAssembly][], compilers now have a second, lower-level language they can
target that runs on the web.

[webassembly]: https://github.com/webassembly/

</aside>

The front end -- scanner and parser -- of a transpiler looks like other
compilers. Then, if the source language is only a simple syntactic skin over the
target language, it may skip analysis entirely and go straight to outputting the
analogous syntax in the destination language.

If the two languages are more semantically different, you'll see more of the
typical phases of a full compiler including analysis and possibly even
optimization. Then, when it comes to code generation, instead of outputting some
binary language like machine code, you produce a string of grammatically correct
source (well, destination) code in the target language.

Either way, you then run that resulting code through the output language's
existing compilation pipeline, and you're good to go.

### Just-in-time compilation

This last one is less a shortcut and more a dangerous alpine scramble best
reserved for experts. The fastest way to execute code is by compiling it to
machine code, but you might not know what architecture your end user's machine
supports. What to do?

You can do the same thing that the HotSpot Java Virtual Machine (JVM),
Microsoft's Common Language Runtime (CLR), and most JavaScript interpreters do.
On the end user's machine, when the program is loaded -- either from source in
the case of JS, or platform-independent bytecode for the JVM and CLR -- you
compile it to native code for the architecture their computer supports.
Naturally enough, this is called **just-in-time compilation**. Most hackers just
say "JIT", pronounced like it rhymes with "fit".

The most sophisticated JITs insert profiling hooks into the generated code to
see which regions are most performance critical and what kind of data is flowing
through them. Then, over time, they will automatically recompile those <span
name="hot">hot spots</span> with more advanced optimizations.

<aside name="hot">

This is, of course, exactly where the HotSpot JVM gets its name.

</aside>

## 编译器和解释器

Now that I've stuffed your head with a dictionary's worth of programming
language jargon, we can finally address a question that's plagued coders since
time immemorial: What's the difference between a compiler and an interpreter?

It turns out this is like asking the difference between a fruit and a vegetable.
That seems like a binary either-or choice, but actually "fruit" is a *botanical*
term and "vegetable" is *culinary*. One does not strictly imply the negation of
the other. There are fruits that aren't vegetables (apples) and vegetables that
aren't fruits (carrots), but also edible plants that are both fruits *and*
vegetables, like tomatoes.

<span name="veg"></span>

<img src="image/a-map-of-the-territory/plants.png" alt="A Venn diagram of edible plants" />

<aside name="veg">

Peanuts (which are not even nuts) and cereals like wheat are actually fruit, but
I got this drawing wrong. What can I say, I'm a software engineer, not a
botanist. I should probably erase the little peanut guy, but he's so cute that I
can't bear to.

Now *pine nuts*, on the other hand, are plant-based foods that are neither
fruits nor vegetables. At least as far as I can tell.

</aside>

So, back to languages:

* **Compiling** is an *implementation technique* that involves translating a
  source language to some other -- usually lower-level -- form. When you
  generate bytecode or machine code, you are compiling. When you transpile to
  another high-level language, you are compiling too.

* When we say a language implementation "is a **compiler**", we mean it
  translates source code to some other form but doesn't execute it. The user has
  to take the resulting output and run it themselves.

* Conversely, when we say an implementation "is an **interpreter**", we mean it
  takes in source code and executes it immediately. It runs programs "from
  source".

Like apples and oranges, some implementations are clearly compilers and *not*
interpreters. GCC and Clang take your C code and compile it to machine code. An
end user runs that executable directly and may never even know which tool was
used to compile it. So those are *compilers* for C.

In older versions of Matz's canonical implementation of Ruby, the user ran Ruby
from source. The implementation parsed it and executed it directly by traversing
the syntax tree. No other translation occurred, either internally or in any
user-visible form. So this was definitely an *interpreter* for Ruby.

But what of CPython? When you run your Python program using it, the code is
parsed and converted to an internal bytecode format, which is then executed
inside the VM. From the user's perspective, this is clearly an interpreter --
they run their program from source. But if you look under CPython's scaly skin,
you'll see that there is definitely some compiling going on.

The answer is that it is <span name="go">both</span>. CPython *is* an
interpreter, and it *has* a compiler. In practice, most scripting languages work
this way, as you can see:

<aside name="go">

The [Go tool][go] is even more of a horticultural curiosity. If you run `go
build`, it compiles your Go source code to machine code and stops. If you type
`go run`, it does that, then immediately executes the generated executable.

So `go` *is* a compiler (you can use it as a tool to compile code without
running it), *is* an interpreter (you can invoke it to immediately run a program
from source), and also *has* a compiler (when you use it as an interpreter, it
is still compiling internally).

[go tool]: https://golang.org/cmd/go/

</aside>

<img src="image/a-map-of-the-territory/venn.png" alt="A Venn diagram of compilers and interpreters" />

That overlapping region in the center is where our second interpreter lives too,
since it internally compiles to bytecode. So while this book is nominally about
interpreters, we'll cover some compilation too.

## 我们的旅程

That's a lot to take in all at once. Don't worry. This isn't the chapter where
you're expected to *understand* all of these pieces and parts. I just want you
to know that they are out there and roughly how they fit together.

This map should serve you well as you explore the territory beyond the guided
path we take in this book. I want to leave you yearning to strike out on your
own and wander all over that mountain.

But, for now, it's time for our own journey to begin. Tighten your bootlaces,
cinch up your pack, and come along. From <span name="here">here</span> on out,
all you need to focus on is the path in front of you.

<aside name="here">

Henceforth, I promise to tone down the whole mountain metaphor thing.

</aside>

<div class="challenges">

## 挑战

1. Pick an open source implementation of a language you like. Download the
   source code and poke around in it. Try to find the code that implements the
   scanner and parser. Are they handwritten, or generated using tools like
   Lex and Yacc? (`.l` or `.y` files usually imply the latter.)

1. Just-in-time compilation tends to be the fastest way to implement dynamically
   typed languages, but not all of them use it. What reasons are there to *not*
   JIT?

1. Most Lisp implementations that compile to C also contain an interpreter that
   lets them execute Lisp code on the fly as well. Why?

</div>
