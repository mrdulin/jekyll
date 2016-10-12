# Blog

__Usage__

*	`jekyll serve`启动开发服务器。

__使用`Jekyll`遇到的问题：__

*	在windows环境下使用jekyll进行本地开发，给文章的YAML头设置中文category和tag，点击文章标题进入文章正文，
	会出现"Not Found"问题，找不到文章。URL连接中的中文和特殊字符被encode成uicode字符，但push到github page上
	是可以正常连接到文章正文的。本地调试解决办法是url链接中不要出现中文或者特殊字符串。

*	文章的category和tag，若是英文字母，则总是小写。设置`All`和`all`，最终显示都为`all`。

*	在Liquid语言中，如果缩进代码，视图上可能会出现"空出若干像素高度"的问题。
	解决办法：
	
	1.在Liquid语言中不要有任何空格和空行，如
	```
	{% for post in paginator.posts %}<li>{{post.title}}</li>{% endfor %}
	```
	2.在_layouts中的模版html中，引入content时，加过滤器，如
	```
	{{ content  | strip_newlines  }}
	```
但好像只能移除开头空出的若干像素高度

*	 根据不同`category`和`tag`加载相应`post`文章的办法。
*	 `post`排序问题，貌似和`post`在文件夹中的位置有关，最上面的第一个`post`会在整个文章列表的最后一页，或者最后一个。