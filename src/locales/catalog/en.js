;(function () {
  const locales = window.WhoAiCatalogLocales || (window.WhoAiCatalogLocales = {})

  // Compact building blocks: the app combines them by the same ids as the Russian catalog.
  locales.en = {
    code: 'en',
    templates: {
      animalName: '{species} {realm}', colorName: '{mood} {base}', adjectiveName: '{intensifier} {root}',
      fullName: '{adjective} {color} {animal}',
      animalSlogan: 'Your animal “{name}” {verb} {theme}.',
      colorSlogan: 'Your colour “{name}” {verb} {theme}.',
      adjectiveSlogan: 'Your superpower “{name}” {verb} {theme}.',
      forecast: '{mood} {action} {final}',
    },
    species: [
      'fox', 'wolf', 'lynx', 'bear', 'raccoon', 'otter', 'beaver', 'badger', 'marten', 'sable', 'wolverine', 'weasel', 'ferret', 'mink', 'skunk',
      'panda', 'koala', 'wombat', 'kangaroo', 'wallaby', 'quokka', 'capybara', 'chinchilla', 'rabbit', 'hare', 'squirrel', 'chipmunk', 'marmot', 'hedgehog', 'bat',
      'sloth', 'anteater', 'armadillo', 'tapir', 'giraffe', 'zebra', 'elephant', 'rhinoceros', 'hippopotamus', 'camel', 'llama', 'alpaca', 'yak', 'deer', 'moose', 'bison',
      'tiger', 'lion', 'cheetah', 'leopard', 'seal', 'dolphin', 'orca', 'beluga', 'narwhal', 'whale', 'shark', 'octopus', 'squid', 'crab', 'seahorse', 'turtle',
      'frog', 'axolotl', 'gecko', 'chameleon', 'crocodile', 'snake', 'owl', 'eagle', 'falcon', 'parrot', 'penguin', 'flamingo', 'peacock',
    ],
    realms: ['from the forest', 'from the mist', 'from the constellations', 'from sea foam'],
    baseColors: [
      'scarlet', 'coral', 'peach', 'amber', 'lemon', 'olive', 'mint', 'emerald', 'turquoise', 'azure', 'sky blue', 'sapphire', 'indigo', 'amethyst', 'lilac',
      'lavender', 'raspberry', 'pink', 'powder', 'chocolate', 'sand', 'caramel', 'smoky', 'graphite', 'silver', 'golden', 'copper', 'coffee', 'jade', 'arctic',
    ],
    colorMoods: ['light', 'sparkling', 'misty', 'moonlit', 'juicy', 'velvety', 'morning', 'deep', 'neon', 'quiet'],
    adjectiveRoots: [
      'sparkling', 'gentle', 'brave', 'dreamy', 'nimble', 'legendary', 'sunny', 'velvety', 'lively', 'kind', 'observant', 'playful', 'free', 'cozy', 'cheerful',
      'wise', 'happy', 'fluffy', 'daring', 'calm', 'bright', 'swift', 'magical', 'warm', 'vivid', 'radiant', 'thoughtful', 'merry', 'mysterious', 'extraordinary',
    ],
    intensifiers: ['truly', 'slightly', 'especially', 'wildly', 'incredibly', 'quietly', 'very', 'warmly', 'sincerely', 'endlessly'],
    verbs: ['finds', 'lights up', 'protects', 'starts', 'gathers', 'turns into magic', 'notices', 'draws', 'hugs', 'imagines', 'gives', 'catches', 'makes stronger', 'opens', 'creates'],
    themes: [
      'joy', 'tiny wonders', 'bright coincidences', 'smiles', 'your inner rhythm', 'new paths', 'inspiration', 'brave thoughts', 'cozy stories', 'a festive mood',
      'sparks', 'soft light', 'play', 'harmony', 'lucky adventures', 'your true self', 'warmth', 'good news', 'imagination', 'freedom',
    ],
    forecastMoods: [
      'Today you have a little more quiet courage.', 'The day begins with gentle curiosity.', 'Your care will be useful today.', 'You have a pocket full of warm energy.', 'Today you can hear your own rhythm clearly.',
      'Your mood is asking for a little play.', 'You can bend without breaking today.', 'There is a tiny, happy buzz in the air.', 'You get to choose your own speed.', 'Simple joys matter a lot today.',
      'Your inner compass is pointing to something new.', 'The day is ready for gentle bravery.', 'A creative spark is waking up inside you.', 'Your calm can be your superpower.', 'Today is good for noticing nice little things.',
      'A lovely surprise may be around the corner.', 'The day is made for kind courage.', 'Your lightness can make others smile.', 'Trust your first kind idea today.', 'You are steady enough for a change.',
      'You are ready, but do not need to be strict.', 'Today you can see old things with fresh eyes.', 'This is a good time to listen to yourself.', 'There is a bit of sunny stubbornness in you.', 'You have room inside for inspiration.',
      'Your kindness can be seen without words.', 'Today makes you want to follow what interests you.', 'You have a calm kind of confidence.', 'The day is good for tiny discoveries.', 'Your mood knows how to find the bright side.',
    ],
    forecastActions: [
      'Start with one small thing that has been waiting for you.', 'Put a short rest just for you into the day.', 'Say yes to an idea that feels interesting.', 'Take a path that is a little different.', 'Say something kind to a person you remember.',
      'Take the first step without a perfect plan.', 'Tidy one tiny corner.', 'Find three things to thank the day for.', 'Do one normal thing in a new way.', 'Leave a little space for a nice surprise.',
      'Ask a question you have wanted to ask.', 'Put more favourite little things around you.', 'Make time for what brings your interest back.', 'Choose a task that will make you breathe easier.', 'Let yourself step away from the rush for a moment.',
      'Notice one beautiful thing on your way.', 'Give your idea ten minutes of attention.', 'Pause before an important answer.', 'Try looking at the problem from another side.', 'Put away what is extra and keep what matters.',
      'Share something that made you smile.', 'Let yourself change your mind if it feels honest.', 'Add a little movement or music to the day.', 'Choose a talk that will feel warmer afterwards.', 'Save one moment in a note or a picture.',
      'Do one useful thing at your own speed.', 'Find a reason to say “thank you” to yourself.', 'Begin with the easiest step and see what happens.', 'Follow curiosity in one safe little thing.', 'Save some quiet time for the end of the day.',
    ],
    forecastFinals: [
      'By evening, may you feel that the day mattered.', 'Then let everything fall into your own rhythm.', 'One tiny step can be a good sign today.', 'Keep this light feeling; it suits you.', 'May the day have room for a pleasant surprise.',
      'Do not rush the good changes.', 'May the day give you one true smile.', 'Tonight you can thank yourself for caring.', 'Your choice today deserves gentle care.', 'May good things show up in simple places.',
      'May there be a little more warmth near you.', 'Being yourself is already enough today.', 'May the end of the day feel soft and cozy.', 'Every tiny joy counts today.', 'Point yourself toward what matters to you.',
      'May the day leave you with a lovely story.', 'You do not need to do everything to be moving.', 'May the right words arrive when you need them.', 'Your care can make today special.', 'May you find more reasons to smile for no reason.',
      'Leave room for a happy coincidence.', 'May the day remind you that your own way works.', 'The warmth you give may come back in a surprise.', 'May the day end with a happy feeling of done.', 'Today, notice what is alive instead of chasing perfect.',
      'May people and thoughts that help you be nearby.', 'Let good things happen without too many worries.', 'May this day give you courage for tomorrow.', 'The best thing today is staying close to yourself.', 'May the evening meet you with calm and a little pride.',
    ],
  }
})()
