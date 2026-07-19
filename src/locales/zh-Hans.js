;(function () {
  const locales = window.WhoAiLocales || (window.WhoAiLocales = {})
  locales['zh-Hans'] = {
    code: 'zh-Hans', htmlLang: 'zh-Hans', title: '简体中文', nativeName: '简体中文',
    strings: {
      'meta.title': '今天你是哪种动物？好玩的小游戏', 'meta.description': '认识彩色小动物的欢乐游戏。写下一个词，遇见今天的小动物。', 'brand.label': '今天你是谁？', 'language.label': '语言', 'language.menu': '选择语言', 'skip.content': '跳到内容', 'themes.label': '页面风格', 'themes.auto': '自动', 'themes.pastel': '宇宙', 'themes.neon': '霓虹',
      'hero.eyebrow': '秘密性格小实验室', 'hero.title.one': '今天你是哪种动物', 'hero.title.two': '呢？', 'hero.intro': '写下名字、昵称或任意一个词，来见见彩色小动物吧。它会送你一句今天的暖心话。', 'search.label': '我们在找谁？', 'search.help': '写下名字或任意一个词，再按“找找我”。', 'search.placeholder': '比如，露娜', 'search.submit': '找找我',
      'scan.ready': '准备看看你的动物气息了吗？', 'scan.found': '找到了！', 'scan.searching': '寻找中…', 'scan.searchingOne': '对比小脚印…', 'scan.searchingTwo': '看看你的性格…', 'scan.searchingThree': '寻找你的颜色…', 'scan.frame.1': '对比小脚印…', 'scan.frame.2': '看看你的性格…', 'scan.frame.3': '寻找你的颜色…',
      'stage.label': '你的动物', 'stage.result': '你的动物', 'stage.caption': '你的动物已经在收集闪亮的故事啦。', 'result.label': '你心里的动物', 'result.fallback': '你的动物', 'result.forecastFallback': '今天可能会是美好的一天。', 'result.tags': '动物的特点', 'result.signals': '动物的小信号', 'result.forecast': '今天会是什么样的一天？', 'result.again': '换一个',
      'tools.label': '图片按钮', 'tools.title': '用你的动物做图片', 'tools.pastel': '图片：糖果宇宙', 'tools.neon': '图片：霓虹野外', 'tools.share.label': '保存或分享你的形象', 'tools.share': '分享我的动物', 'share.title': '今天你是谁？', 'share.text': '我是{identity} 🐾 你呢？',
      'feedback.promptCopied': '做图片的文字已复制。', 'feedback.promptError': '没能复制。请用安全链接打开网站。', 'feedback.shareSuccess': '完成！发给朋友，让他们也认识自己的动物吧。', 'feedback.shareCopied': '完成！文字和链接已复制。', 'feedback.shareError': '没能自动分享。', 'feedback.prompt.copied': '做图片的文字已复制。', 'feedback.prompt.failed': '没能复制。请用安全链接打开网站。', 'feedback.share.success': '完成！发给朋友，让他们也认识自己的动物吧。', 'feedback.share.copied': '完成！文字和链接已复制。', 'feedback.share.failed': '没能自动分享。',
      'seo.eyebrow': '动物小游戏', 'seo.title': '怎样找到你的小动物？', 'seo.intro': '“你是谁？”是一个欢乐的动物小游戏。写下名字或任意一个词，游戏会给你一只彩色小动物和今天的暖心话。', 'seo.step.1': '写下一个词。', 'seo.step.2': '看看哪只小动物来找你。', 'seo.step.3': '按按钮做一张有小动物的图片。', 'seo.avatar.title': '做一张有你的小动物的图片', 'seo.avatar.text': '下面有图片按钮。按一个，就能做一张小动物的画。', 'faq.title': '常见问题', 'faq.1.q': '这是游戏吗？', 'faq.1.a': '是呀。这是认识小动物的欢乐游戏。', 'faq.2.q': '为什么是这只动物？', 'faq.2.a': '你写的词会帮助游戏挑选动物。试试别的词，可能会来另一只。', 'faq.3.q': '关于今天的话是什么？', 'faq.3.a': '那是一句给今天的暖心话，不能猜未来。', 'faq.4.q': '我能做图片吗？', 'faq.4.a': '可以。按图片按钮，再把你的小动物给朋友看。'
    },
    dynamic: { fullName: '{adjective}的{color}{animal}', shareText: '我是{identity} 🐾 你呢？', imagePrompt: '请创作一张1:1方形插画。主角是{animal}，名字是“{identity}”。主色和重点是{color}（{hex}）；动物要用这个颜色和有生命力的渐变。背景：{scene}。性格：{adjective}。故事：{animalSlogan} {colorSlogan} {adjectiveSlogan} 今天的心情：{forecast}。风格：{style}。动物大大地在中间，没有文字、标志和边框。', scene: { forest: '有高高树木和柔和光线的童话森林', water: '闪闪发亮的水、波浪和轻轻的水花', cosmos: '深邃宇宙、星尘和发光的星座', mist: '神秘薄雾、柔和山丘和月光' }, style: { pastel: '柔和的粉彩3D插画、糖果宇宙和圆圆的友好形状', neon: '明亮的霓虹插画、未来野外和清晰图形线条' } }
  }
})()
