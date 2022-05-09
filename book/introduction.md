> 童话如此真实: 不是因为告诉我们龙是存在的，
> 而是因为告诉我们龙是可以被打败的.
>
> <cite>G.K. Chesterton by way of Neil Gaiman, <em>Coraline</em></cite>

我真的非常兴奋我们将要一起开始这趟旅程，
这是一本关于如何实现编程语言解释器的书，
也是一本如何设计一门实用编程语言的书，
一本我第一次学编程语言时就希望能读到的书，一本我已经在<span
name="head">脑子</span>里写了将近十年的书。

<aside name="head">

我的朋友和家人们，请原谅我对你们的漫不经心！

</aside>

在本书中，我们将通过一步一步来实现2个解释器获得一个功能齐全的编程语言。
我假设这是你第一次涉足编程语言实现，所以我将详细介绍构建一个完整的，可用的，快速的语言实现所需要的每一个概念和每一行代码。

为了能将2个解释器的完整实现塞进一本书而又要避免它厚的变成门档，本书在理论上会比其它的书介绍的更浅显易懂一些。
在我们构建系统的每个部分时，我将介绍其背后的历史和概念。
我会带领你熟悉这些术语，以便即使你发现自己在一个满是PL(编程语言)研究员的<span name="party">鸡尾酒会</span>，你依然可以谈笑风生。

<aside name="party">

奇怪的是,我已经多次发现一种情形，
你真的不敢相信，有些人多能喝！

</aside>

但是我们依然要绞尽脑汁来让编程语言跑起来，这不是说理论不重要，在我们学习编程语言时，能够对语法和语义进行精确而<span name="formal">形式化</span>解释是一项很重要的能力。
但是，对我个人来说，通过动手来学会学的更好。
对我来说，只是阅读满是抽象概念的文字，将很难真正理解它们，但是一旦我写点代码，跑一跑，调试一下，然后我就*理解*了。

<aside name="formal">

静态类型系统尤其需要严格的形式化推理，破解类型系统和证明数学定理是一样的感觉。

事实证明，这并非巧合。
上个世纪初，Haskell Curry和William Alvin Howard 已经证明他们是同一枚硬币的两面：[柯里-霍华德同构](https://zh.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C-%E9%9C%8D%E5%8D%8E%E5%BE%B7%E5%90%8C%E6%9E%84)

</aside>

这是我对你制定的目标，我希望你学完后拥有坚实的直觉，来理解编程语言的生老病死和一颦一笑。
我希望当你以后阅读更理论一些的书时，那些概念能牢牢的留在你的脑海里，附着在这个有形的基底上。

## 为什么要学习这些东西?

每一本编译器相关书籍的前言似乎都有这一节，我不知道是什么导致编程语言会有这种存在性怀疑。
我不认为鸟类学书籍会担心其存在的合理性，他们假设读者喜欢鸟，然后开始教学。

但是编译语言有一点不同，我认为，我们中的任何一个人，成功创造一个被广泛应用的通用性编程语言的几率是很小的。
世界级流行编程语言的设计者们，一辆大众大巴就可以装得下，甚至都不需要把顶棚打开。
如果加入那种精英组织才是学习编程语言的唯一原因的话，确实很难给出合理的理由，幸运的是，只要你感兴趣，就可以学习。

### 小众语言到处都是

对于每一种成功的通用语言，都有一千种成功的细分语言。
我们习惯称它们为"小众语言"，但是专业术语的滥用导致称之为"领域特定语言"。
它们是为特殊任务量身定做的混合语言，例如程序脚本语言，模板引擎，标记格式化和配置文件。

<span name="little"></span><img src="image/introduction/little-languages.png" alt="随机选择的小众语言" />

<aside name="little">

随机选择的一些小众语言，你可能曾经使用过

</aside>

几乎每个大型软件项目都需要其中的一小部分，如果可以，重用已有的总是好的。一旦你把文档，调试器，编辑器支持，语法高亮，等等考虑进来，自己实现功能就变成了棘手的事情。

当没有合适的类库满足你的需求时，将会有很大可能，你会发现你需要自己改造分析器或者其它工具。
即使当你重用一些已有的实现时，你也不可避免地需要调试和维护它们，并在其内部探索。

### 语言是很好的锻炼

长跑运动员有时候会在他们脚踝上绑上重物或者在氧气稀薄的高海拔地区来进行训练。
当他们后来卸下自己的负担时，相对轻巧的四肢，富含氧气的空气能让他们跑的更远和更快。

实现一门语言是对编程技能的真正考验，代码很复杂，而性能很关键。你必须掌握递归、动态数组、树、图和哈希表。
你可能已经在日常编程工作中使用过哈希表了，但是你*真正*理解他们了吗？等我们从零制作我们自己的哈希表之后，我保证你会真正理解。

虽然我想向你展示一个解释器并不像你认为的那样令人生畏，但实现一个好的解释器依然是一个挑战。战胜它，你将会成为更强的程序员，可以更聪明的使用你日常工作中遇到的数据结构和算法。

### 还有一个原因

最后一个原因我很难承认，因为它是我的心事。
自从我小时候学会编程以来，我就觉得编程语言有一些神奇的东西。
当我第一次一个键一个键地输入BASIC程序时，我无法想象BASIC语言*本身*是如何制作出来的。

后来，当我的大学朋友们谈论他们的编译器课程时，脸上那种既敬畏又恐惧的表情足以让我相信，编程语言黑客是不同的一类人，某种获得了通向神秘艺术的特权的巫师。

这是一张迷人的<span name="image">图片</span>，但是它也有黑暗的一面。
*我*感觉自己不像个巫师，所以我认为自己缺乏加入秘社所需的先天品质。
虽然自从我在学校笔记本上随手涂鸦关键字以来，我一直对编程语言着迷，但是我花了很长时间才鼓起勇气试着真正去学习。
那种“神奇”的品质，那种排他性的感觉，将*我*挡在门外。

<aside name="image">

编程语言的从业者们会毫不犹豫的把玩这张图片，
2个开创性的编程语言书籍在它们的封面展示了[龙][]和[巫师][]

[龙]: https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools
[巫师]: https://mitpress.mit.edu/sites/default/files/sicp/index.html

</aside>

当我最终开始拼凑我自己的小型编译器时，我很快意识到，根本就没有魔法。编译器只是代码，而那些掌握编程语言实现的人也只是人。

确实*有*一些技术是你在编程语言之外不会经常遇到的，而且有些部分有点难。但不会比你克服的其他障碍更困难。如果你曾经被编程语言吓到，希望这本书能帮助你克服这种恐惧，也许我会让你比以前更勇敢一点。

而且，谁知道呢，也许你*会*创造出下一个伟大的编程语言呢，一定有人会的。

## 这本书的组织方式

这本书分为三个部分，你现在正在读的是第一部分，这部分由几个章节组成，通过教你一些编译原理的术语，介绍我们后续要实现的Lox编程语言，来让你逐步适应。

其他两个部分则分别构建一个完整的Lox解释器。在这些部分中，每个章节的结构都是相同的。每一章节挑选编程语言的一个特性，并教你背后对应的概念，然后逐步介绍实现方法。

我花了不少时间去试错，但我还是成功地把两个解释器按照章节分开了，当前章节只需要之前的内容而不需要后续章节的内容。
从第一章开始，你就会有一个可以运行和使用的程序。
随着章节的推移，程序的功能越来越丰富，直到你最终拥有一门完整的编程语言。

除了丰富，精彩纷呈的主要内容外，这些章节还有一些其它锦上添花的内容。

### 代码

我们是冲着*自己动手写*解释器来的，所以这本书肯定要包含代码，每一行代码都不会漏掉，而且每个代码片段都会告诉你插入到之前代码的什么位置。

许多其他的编程语言书籍和编程语言实现都使用[Lex][]和<span name="yacc">[Yacc][]</span>这样的工具，
也就是**生成编译器的编译器**，可以从更高层次的描述自动生成一些源文件。
像这样的工具有利有弊，喜欢和不喜欢的人都各有观点，-- 有些人可能说这是信仰。

<aside name="yacc">

Yacc是一个工具，它接收语法文件并生成编译器的源文件，因此它有点像一个输出“编译器”的编译器，这就是我们为什么叫它“编译器的编译器”。

Yacc并不是同类工具中的第一个，这就是为什么它被命名为"Yacc" -- *Yet
Another* Compiler-Compiler（另一个编译器的编译器），后来有一个类似的工具叫[Bison][](野牛)，命名来自于Yacc读音的双关语，读作"yak(牦牛)"。

<img src="image/introduction/yak.png" alt="A yak." />

[bison]: https://zh.wikipedia.org/wiki/GNU_bison

如果你发现所有这些自引用和双关语迷人而有趣，你会感觉来对地方了。如果没有，好吧，也许编程语言书呆子式的幽默感，也需要练习才能感觉到了。

</aside>

我们这里不会使用它们，我想要确保魔法和困惑没有黑暗的角落可以躲藏，所以我们会手写所有代码。
就像你将要看到的，并没有听起来那么糟糕，因为这意味着你可以真正明白每一行代码，以及两个解释器是如何工作的。

[lex]: https://en.wikipedia.org/wiki/Lex_(software)
[yacc]: https://en.wikipedia.org/wiki/Yacc

书与“真实世界”有不同的限制，因此这里的代码风格可能并不是编写可维护产品级软件的最佳实践。如果我看起来有点漫不经心，比如说，省略private关键字或者声明为全局变量，请理解我这样做是为了让你更容易看懂代码。书页不像IDE窗口那么宽，要惜墨如金。

另外，代码也不会有太多的注释，这是因为每一段代码前后，都有几段恰当的文字对其进行解释。当你写一本书来配合你的程序时，欢迎你也省略注释。否则，你应该会比我使用的//更多一些。

虽然书中包含了每一行代码，并解释了每一行代码的含义，但它没有描述如何编译和运行解释器。我假设你可以使用Makefile或者在你IDE的项目里按序编译，以便让代码运行起来。这类机制很快就会过时，我希望这本书能像XO白兰地一样愈久弥香，而不是像后院的烈酒（一样）。

### 代码片段

Since the book contains literally every line of code needed for the
implementations, the snippets are quite precise. 
既然本书包含了实现所需的每一行代码，所以代码片段比较清晰明确。
Also, because I try to keep the
program in a runnable state even when major features are missing,
另外，因为我想要程序在缺少主要功能的情况下依然可以编译运行，所以有时候我们会添加一些，在后面代码片段里会被取代的临时代码。

一个花里胡哨的代码片段长这样：

<div class="codehilite"><pre class="insert-before">
      default:
</pre><div class="source-file"><em>lox/Scanner.java</em><br>
in <em>scanToken</em>()<br>
replace 1 line</div>
<pre class="insert">
        <span class="k">if</span> (<span class="i">isDigit</span>(<span class="i">c</span>)) {
          <span class="i">number</span>();
        } <span class="k">else</span> {
          <span class="t">Lox</span>.<span class="i">error</span>(<span class="i">line</span>, <span class="s">&quot;Unexpected character.&quot;</span>);
        }
</pre><pre class="insert-after">
        break;
</pre></div>
<div class="source-file-narrow"><em>lox/Scanner.java</em>, in <em>scanToken</em>(), replace 1 line</div>

中间是要添加的新代码，这部分代码的上面或下面可能有一些淡出的行，以显示它在上下代码中的位置。
这里还会有一小段简介告诉你在哪个文件和什么地方放置代码片段。
如果简介显示"replace _ lines"，表明在浅色的行之间有一些现有的代码需要删除，并替换为新的代码片段。

### 旁白

<span name="joke">旁白</span>包含传记草图、历史背景、对相关主题的引用以及其他领域的探索建议，其对本书后续部分的理解无关紧要，所以如果你愿意，你可以选择跳过它们，我不会评判你，但是我可能会有点不开心。

<aside name="joke">

好吧,至少一些旁白，或者说大部分旁白只是一些笑话和业余的涂鸦。

</aside>

### 挑战

每一章的结尾都有一些练习，和教科书中只是回顾你已经学过的知识的习题集不同，这些练习是为了帮助你学习本章以外的更多的内容，
它们强制你脱离指导方向，自己去探索。
它们会让你研究其它语言，找到如何实现特性，或者让你跳出你的舒适圈。

<span name="warning">克服</span> 挑战，你会扩大你的知识面，可能会有一些磕磕碰碰，也可以跳过它们，如果你只是想待在舒适的旅游大巴里，这是你的选择。

<aside name="warning">

警告：挑战题目通常要求你对正在构建的解释器进行更改。你应该在代码副本中实现这些功能。后面的章节假设你的解释器处于崭新的（未挑战？）状态。

</aside>

### 设计笔记

大多数“编程语言”书籍都是严格意义上的编程语言*实现*书籍，他们很少讨论如何*设计*正在实现的语言。
实现之所以有趣，是因为它的定义是<span name="benchmark">如此的精确</span>，
我们程序员似乎很喜欢黑和白、1和0这样的事物。

<aside name="benchmark">
我知道很多编程语言黑客的职业就是干这个的。你将一份语言规范塞到他们的门下，等上几个月，代码和基准测试结果就出来了。
</aside>

就个人而言，我认为世界只需要目前这么多的<span
name="fortran">FORTRAN 77</span>实现。在某个时候，你会发现自己正在设计一种*新的*语言，一旦你开始*那样*做，方程式中较柔和，人性化的一面就变得至关重要。诸如哪些编程语言特性易于学习，如何在创新和熟悉度之间取得平衡，哪种语法更易读以及使用者是谁。

<aside name="fortran">
希望你的新编程语言不会将对打孔卡宽度的假设硬编码到语法中。
</aside>

所有这些都会对你的新编程语言的成功产生深远的影响。我希望你的语言取得成功，因此在某些章节中，我以一篇“设计笔记”结尾，一篇关于编程语言的人文方面的小短文。
我并不是这方面的专家——我不确定是否有人真的精通这些，因此把这些和一大撮盐一起吃，从而让你的想法更有人文性，这正是我的目标。

## 第一个解释器

We'll write our first interpreter, jlox, in <span name="lang">Java</span>. The
focus is on *concepts*. We'll write the simplest, cleanest code we can to
correctly implement the semantics of the language. This will get us comfortable
with the basic techniques and also hone our understanding of exactly how the
language is supposed to behave.

<aside name="lang">

The book uses Java and C, but readers have ported the code to [many other
languages][port]. If the languages I picked aren't your bag, take a look at
those.

[port]: https://github.com/munificent/craftinginterpreters/wiki/Lox-implementations

</aside>

Java is a great language for this. It's high level enough that we don't get
overwhelmed by fiddly implementation details, but it's still pretty explicit.
Unlike in scripting languages, there tends to be less complex machinery hiding
under the hood, and you've got static types to see what data structures you're
working with.

I also chose Java specifically because it is an object-oriented language. That
paradigm swept the programming world in the '90s and is now the dominant way of
thinking for millions of programmers. Odds are good you're already used to
organizing code into classes and methods, so we'll keep you in that comfort
zone.

While academic language folks sometimes look down on object-oriented languages,
the reality is that they are widely used even for language work. GCC and LLVM
are written in C++, as are most JavaScript virtual machines. Object-oriented
languages are ubiquitous, and the tools and compilers *for* a language are often
written *in* the <span name="host">same language</span>.

<aside name="host">

A compiler reads files in one language, translates them, and outputs files in
another language. You can implement a compiler in any language, including the
same language it compiles, a process called **self-hosting**.

You can't compile your compiler using itself yet, but if you have another
compiler for your language written in some other language, you use *that* one to
compile your compiler once. Now you can use the compiled version of your own
compiler to compile future versions of itself, and you can discard the original
one compiled from the other compiler. This is called **bootstrapping**, from
the image of pulling yourself up by your own bootstraps.

<img src="image/introduction/bootstrap.png" alt="Fact: This is the primary mode of transportation of the American cowboy." />

</aside>

And, finally, Java is hugely popular. That means there's a good chance you
already know it, so there's less for you to learn to get going in the book. If
you aren't that familiar with Java, don't freak out. I try to stick to a fairly
minimal subset of it. I use the diamond operator from Java 7 to make things a
little more terse, but that's about it as far as "advanced" features go. If you
know another object-oriented language, like C# or C++, you can muddle through.

By the end of part II, we'll have a simple, readable implementation. It's not
very fast, but it's correct. However, we are only able to accomplish that by
building on the Java virtual machine's own runtime facilities. We want to learn
how Java *itself* implements those things.

## 第二个解释器

So in the next part, we start all over again, but this time in C. C is the
perfect language for understanding how an implementation *really* works, all the
way down to the bytes in memory and the code flowing through the CPU.

A big reason that we're using C is so I can show you things C is particularly
good at, but that *does* mean you'll need to be pretty comfortable with it. You
don't have to be the reincarnation of Dennis Ritchie, but you shouldn't be
spooked by pointers either.

If you aren't there yet, pick up an introductory book on C and chew through it,
then come back here when you're done. In return, you'll come away from this book
an even stronger C programmer. That's useful given how many language
implementations are written in C: Lua, CPython, and Ruby's MRI, to name a few.

In our C interpreter, <span name="clox">clox</span>, we are forced to implement
for ourselves all the things Java gave us for free. We'll write our own dynamic
array and hash table. We'll decide how objects are represented in memory, and
build a garbage collector to reclaim them.

<aside name="clox">

I pronounce the name like "sea-locks", but you can say it "clocks" or even
"cloch", where you pronounce the "x" like the Greeks do if it makes you happy.

</aside>

Our Java implementation was focused on being correct. Now that we have that
down, we'll turn to also being *fast*. Our C interpreter will contain a <span
name="compiler">compiler</span> that translates Lox to an efficient bytecode
representation (don't worry, I'll get into what that means soon), which it then
executes. This is the same technique used by implementations of Lua, Python,
Ruby, PHP, and many other successful languages.

<aside name="compiler">

Did you think this was just an interpreter book? It's a compiler book as well.
Two for the price of one!

</aside>

We'll even try our hand at benchmarking and optimization. By the end, we'll have
a robust, accurate, fast interpreter for our language, able to keep up with
other professional caliber implementations out there. Not bad for one book and a
few thousand lines of code.

<div class="challenges">

## 挑战

1.  There are at least six domain-specific languages used in the [little system
    I cobbled together][repo] to write and publish this book. What are they?

1.  Get a "Hello, world!" program written and running in Java. Set up whatever
    makefiles or IDE projects you need to get it working. If you have a
    debugger, get comfortable with it and step through your program as it runs.

1.  Do the same thing for C. To get some practice with pointers, define a
    [doubly linked list][] of heap-allocated strings. Write functions to insert,
    find, and delete items from it. Test them.

[repo]: https://github.com/munificent/craftinginterpreters
[doubly linked list]: https://en.wikipedia.org/wiki/Doubly_linked_list

</div>

<div class="design-note">

## 设计笔记: 如何为编程语言起名字?

One of the hardest challenges in writing this book was coming up with a name for
the language it implements. I went through *pages* of candidates before I found
one that worked. As you'll discover on the first day you start building your own
language, naming is deviously hard. A good name satisfies a few criteria:

1.  **It isn't in use.** You can run into all sorts of trouble, legal and
    social, if you inadvertently step on someone else's name.

2.  **It's easy to pronounce.** If things go well, hordes of people will be
    saying and writing your language's name. Anything longer than a couple of
    syllables or a handful of letters will annoy them to no end.

3.  **It's distinct enough to search for.** People will Google your language's
    name to learn about it, so you want a word that's rare enough that most
    results point to your docs. Though, with the amount of AI search engines are
    packing today, that's less of an issue. Still, you won't be doing your users
    any favors if you name your language "for".

4.  **It doesn't have negative connotations across a number of cultures.** This
    is hard to be on guard for, but it's worth considering. The designer of
    Nimrod ended up renaming his language to "Nim" because too many people
    remember that Bugs Bunny used "Nimrod" as an insult. (Bugs was using it
    ironically.)

If your potential name makes it through that gauntlet, keep it. Don't get hung
up on trying to find an appellation that captures the quintessence of your
language. If the names of the world's other successful languages teach us
anything, it's that the name doesn't matter much. All you need is a reasonably
unique token.

</div>
