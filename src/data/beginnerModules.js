/** Beginner modules 00–04: content-only definitions consumed by AppliedAIModule. */
export const beginnerModules = {
  '00': {
    id: '00',
    title: 'Before AI: tiny foundations',
    objective: {
      heading: 'See the pattern behind every AI step',
      body: 'Before tokens and transformers, get comfortable with three ideas: data goes in, an operation runs, a result comes out; data has types and shapes; library calls are named operations you hand data to.',
      bullets: [
        'Trace input → operation → output on a tiny example',
        'Run one hands-on experiment without writing code',
        'Pass quick checks with immediate feedback',
      ],
      aside: 'Remember: even print(result) is input → operation → output.',
    },
    learn: [
      {
        heading: 'Input → operation → output',
        body: 'Every useful step — including AI — follows the same skeleton.',
        interaction: 'io-flow',
        aside: 'Real example: camera photo → resize filter → thumbnail file.',
      },
    ],
    experiment: {
      heading: 'Run one small operation',
      body: 'Pick a scenario and trace data through a named operation. You are practicing the habit, not memorizing syntax.',
      interaction: 'operation-runner',
      aside: 'Library calls hide complexity—you still control what goes in and read what comes out.',
    },
    quiz: [
      {
        q: 'In every useful computation, what must exist before you see a result?',
        choices: ['Only a fancy algorithm name', 'Input data passed into an operation', 'A printed error message'],
        correct: 1,
        feedback: 'Something goes in, an operation runs, a result comes out. AI models follow the same pattern at scale.',
      },
      {
        q: 'Which example has a “list” shape — many values in one container?',
        choices: ['42', '["apple", "banana", "cherry"]', '"hello"'],
        correct: 1,
        feedback: 'A list holds multiple items. Later, batches of examples and token sequences are also lists — just bigger.',
      },
      {
        q: 'Why call a library function like average(numbers)?',
        choices: [
          'To hide input data forever',
          'To pass your data into a ready-made, tested operation',
          'Because Python refuses to add two numbers otherwise',
        ],
        correct: 1,
        feedback: 'Libraries package operations so you focus on what goes in and what comes out — the same idea behind model APIs.',
      },
    ],
    recap: {
      heading: 'Section 00 complete',
      points: [
        { label: 'Pattern', text: 'Every step takes input, runs an operation, and returns output — including LLM calls.' },
        { label: 'Shapes', text: 'A single number, a word, or a list are different containers; later modules scale to batches and token sequences.' },
        { label: 'Library calls', text: 'average(scores) means “pass this data into a ready-made operation.” Model APIs work the same way.' },
      ],
    },
  },

  '01': {
    id: '01',
    title: 'AI map & Python refresh',
    objective: {
      heading: 'Place AI on a map and read a dataset',
      body: 'Clarify AI vs ML vs deep learning vs generative AI. Then see how Python tools (NumPy, Pandas) organize numbers into tables you can feed to models — without writing code yourself.',
      bullets: [
        'Sort terms from broad AI down to generative models',
        'Identify features, labels, and inference on a tiny table',
        'Trace one row from input columns to a prediction',
      ],
      aside: 'Chat assistants are generative AI; a spam filter is classic ML—both sit under the AI umbrella.',
    },
    learn: [
      {
        heading: 'The AI family tree',
        body: 'Terms nest inside each other. Generative AI is a slice of deep learning, which is a slice of machine learning, which sits inside AI.',
        interaction: 'ai-taxonomy',
        aside: 'Rule-based chess engines count as AI but not machine learning—they follow hand-written rules.',
      },
      {
        heading: 'Tables, features, and labels',
        body: 'Most beginner ML starts with a spreadsheet-like dataset: columns you measure (features) and sometimes a column you want to predict (label).',
        interaction: 'dataset-table',
        aside: 'Rows = examples · columns = features · label = the column you predict when training.',
      },
    ],
    experiment: {
      heading: 'Trace one prediction',
      body: 'Select a row from a tiny house-price dataset. Watch features go in and a predicted price come out — that final step is inference.',
      interaction: 'inference-trace',
      aside: 'Inference uses a trained model on new data—the same pattern as calling an API with fresh input.',
    },
    quiz: [
      {
        q: 'Which statement is most accurate?',
        choices: [
          'All AI systems are large language models',
          'Machine learning is one approach inside the broader field of AI',
          'Deep learning excludes neural networks',
        ],
        correct: 1,
        feedback: 'AI is the umbrella. ML learns patterns from data; deep learning uses neural networks; generative AI creates new content.',
      },
      {
        q: 'In a supervised learning table, what is a “feature”?',
        choices: ['The answer we want to predict', 'An input column the model uses', 'A row that leaked from the test set'],
        correct: 1,
        feedback: 'Features are measurable inputs — size, age, word counts. The label is what you predict when training.',
      },
      {
        q: 'NumPy/Pandas mainly help you…',
        choices: [
          'Replace the need for any model',
          'Store and shape numeric data before it reaches an operation',
          'Generate text without a network',
        ],
        correct: 1,
        feedback: 'They organize numbers into arrays and tables so operations (including models) receive consistent shapes.',
      },
      {
        q: '“Inference” means…',
        choices: [
          'Updating weights during training',
          'Using a trained model to produce an output for new input',
          'Deleting half your dataset',
        ],
        correct: 1,
        feedback: 'Training adjusts the model; inference applies it to fresh data — like predicting a price for a new house.',
      },
    ],
    recap: {
      heading: 'Section 01 complete',
      points: [
        { label: 'Vocabulary', text: 'AI ⊃ ML ⊃ deep learning; generative AI creates new text, images, or code.' },
        { label: 'Data', text: 'Features are input columns; labels are targets in supervised learning.' },
        { label: 'Tools', text: 'NumPy/Pandas shape data; the model (or API) is still an input → operation → output step.' },
      ],
    },
  },

  '02': {
    id: '02',
    title: 'Classical machine learning',
    objective: {
      heading: 'Learn the core ML task types and honest evaluation',
      body: 'Classical ML covers regression, classification, and clustering. The critical habit is splitting data correctly so your score reflects real-world performance — and spotting leakage before it fools you.',
      bullets: [
        'Match problems to supervised vs unsupervised learning',
        'Assign scenarios to regression, classification, or clustering',
        'Choose a safe train/validation/test split and spot leakage',
      ],
      aside: 'Pick the task type first—regression, classification, or clustering—then choose an algorithm.',
    },
    learn: [
      {
        heading: 'Supervised vs unsupervised',
        body: 'Supervised learning uses labeled examples. Unsupervised learning finds structure without a provided answer column.',
        interaction: 'supervised-unsupervised',
        aside: 'Customer segments with no label column → unsupervised clustering.',
      },
      {
        heading: 'Three common task shapes',
        body: 'Regression predicts a number, classification picks a category, clustering groups similar items with no label column.',
        interaction: 'ml-task-matcher',
        aside: 'House price = regression · fraud yes/no = classification · similar shoppers = clustering.',
      },
    ],
    experiment: {
      heading: 'Split data without cheating',
      body: 'Pick a splitting strategy for a product scenario. Some choices leak future information or waste data — learn to spot them.',
      interaction: 'split-scenario',
      aside: 'Touch the test set once at the end—tuning against it inflates scores.',
    },
    quiz: [
      {
        q: 'Which problem is classification?',
        choices: ['Predict tomorrow’s temperature', 'Spam vs not spam', 'Group customers by behavior with no labels'],
        correct: 1,
        feedback: 'Classification chooses among categories. Temperature is regression; unlabeled grouping is clustering.',
      },
      {
        q: 'Why hold out a test set you touch only once at the end?',
        choices: [
          'To make training slower',
          'To estimate performance on unseen data you did not tune against',
          'Because models cannot use training rows',
        ],
        correct: 1,
        feedback: 'Validation helps you tune; the test set simulates the real world. Reusing it for decisions inflates scores.',
      },
      {
        q: 'Data leakage means…',
        choices: [
          'The dataset file is public',
          'Information from the future or target sneaks into features',
          'The model is too small',
        ],
        correct: 1,
        feedback: 'Leakage gives the model hints it would not have in production — like including “refund issued” to predict fraud.',
      },
      {
        q: 'A sensible accuracy metric for a spam filter helps you…',
        choices: [
          'Measure how often the predicted label matches the true label on labeled examples',
          'Count lines of Python',
          'Guarantee zero mistakes in production',
        ],
        correct: 0,
        feedback: 'Accuracy is one metric for classification; context matters (e.g., medical or fraud cases may need recall/precision).',
      },
    ],
    recap: {
      heading: 'Section 02 complete',
      points: [
        { label: 'Tasks', text: 'Regression → number; classification → category; clustering → groups without labels.' },
        { label: 'Splits', text: 'Train to learn, validate to tune, test once to estimate real performance.' },
        { label: 'Leakage', text: 'If a feature would not exist at prediction time, it must not be in training.' },
      ],
    },
  },

  '03': {
    id: '03',
    title: 'Neural networks & deep learning',
    objective: {
      heading: 'See what “learning” means inside a network',
      body: 'A neural network stacks simple units that multiply inputs by weights, add up, and apply an activation. Training adjusts weights using loss and gradient descent — many small steps over epochs.',
      bullets: [
        'Follow data through layers, weights, and activation',
        'Connect loss to “how wrong” the network is',
        'Explore learning rate and epochs with a tiny training story',
      ],
      aside: 'Deep learning stacks many layers of simple math—each layer learns richer patterns.',
    },
    learn: [
      {
        heading: 'One neuron, many layers',
        body: 'Each unit combines inputs with weights, adds a bias, then applies an activation to keep signals usable. Layers stack these units to learn richer patterns.',
        interaction: 'neuron-layers',
        aside: 'Activation functions keep signals in a usable range—without them, deep stacks struggle.',
      },
      {
        heading: 'Loss, gradients, and epochs',
        body: 'Loss scores error. Training nudges weights to reduce loss. Gradient descent is the nudging strategy; backprop figures out which weights to change.',
        interaction: 'training-concepts',
        aside: 'One epoch = one full pass through the training data.',
      },
    ],
    experiment: {
      heading: 'Tune a tiny training run',
      body: 'Pick a learning rate and number of epochs. See qualitative outcomes — not exact math — for stable learning vs chaos vs slow progress vs overfitting.',
      interaction: 'training-simulator',
      aside: 'Validation loss rising while training loss falls → classic overfitting signal.',
    },
    quiz: [
      {
        q: 'What do weights in a neural network primarily control?',
        choices: ['How strongly each input influences the next computation', 'The color of charts', 'The file name of the dataset'],
        correct: 0,
        feedback: 'Weights scale inputs. Training adjusts them so the network’s outputs better match desired results.',
      },
      {
        q: 'Loss is best described as…',
        choices: ['A measure of how wrong the model’s predictions are', 'The number of layers', 'The learning rate'],
        correct: 0,
        feedback: 'Training tries to minimize loss — the gap between prediction and target (depending on task).',
      },
      {
        q: 'A learning rate that is too high often causes…',
        choices: ['Stable, slow improvement every time', 'Wild swings or failure to settle', 'Automatic overfitting prevention'],
        correct: 1,
        feedback: 'Steps that are too big overshoot good weights. Too small a rate learns slowly.',
      },
      {
        q: 'Overfitting means…',
        choices: [
          'The model memorizes training quirks and weakens on new data',
          'The dataset is too large',
          'Activation functions are disabled',
        ],
        correct: 0,
        feedback: 'More epochs can help — until the model starts fitting noise. Validation loss helps you notice this.',
      },
    ],
    recap: {
      heading: 'Section 03 complete',
      points: [
        { label: 'Structure', text: 'Layers of weighted sums + activations transform inputs step by step.' },
        { label: 'Training', text: 'Loss guides weight updates via gradient descent over many epochs.' },
        { label: 'Tuning', text: 'Learning rate and epoch count trade speed, stability, and generalization.' },
      ],
    },
  },

  '04': {
    id: '04',
    title: 'LLM foundations',
    objective: {
      heading: 'Follow text through a language model',
      body: 'Large language models read tokens, map them to embeddings, pass context through transformer layers with attention, then predict one token at a time. Sampling choices and context limits shape what you see in apps.',
      bullets: [
        'Tokenize text and connect tokens to IDs and embeddings',
        'See why attention lets context matter',
        'Compare greedy vs higher-temperature sampling and link to the Guided Lab',
      ],
      aside: 'Models predict likely language—they do not automatically verify facts unless tools are added.',
    },
    learn: [
      {
        heading: 'Tokens, IDs, and embeddings',
        body: 'Text becomes tokens, tokens become IDs, IDs become vectors (embeddings). Similar words can land near each other in vector space — but meaning depends on context.',
        interaction: 'token-pipeline',
        aside: 'The same word in different sentences can get different embeddings in practice.',
      },
      {
        heading: 'Attention, transformers, and context windows',
        body: 'Attention lets each token weigh other tokens in the window. Transformers stack this mechanism. A context window caps how much text the model can consider at once.',
        interaction: 'attention-context',
        aside: 'Context window = working memory limit for a single request.',
      },
    ],
    experiment: {
      heading: 'Next-token choices and temperature',
      body: 'Given a partial sentence, compare likely next tokens. Temperature controls randomness — lower is safer and more predictable; higher is more varied.',
      interaction: 'sampling-lab',
      aside: 'Temperature trades predictable continuations against more creative variety.',
    },
    quiz: [
      {
        q: 'A token is…',
        choices: ['Always one full English word', 'A chunk of text the model reads — often a word or piece of one', 'A database row'],
        correct: 1,
        feedback: 'Tokenization splits text into model-sized pieces; “running” might be one token or split depending on the vocabulary.',
      },
      {
        q: 'Embeddings represent tokens as…',
        choices: ['Vectors of numbers capturing relationships in context', 'Plain dictionary definitions', 'Random UUIDs'],
        correct: 0,
        feedback: 'Embeddings let the model do math over language; nearby vectors can reflect similar usage.',
      },
      {
        q: 'Attention helps a model…',
        choices: [
          'Focus on relevant parts of the input when producing each token',
          'Skip the context window entirely',
          'Guarantee factual answers',
        ],
        correct: 0,
        feedback: 'Attention weights which tokens matter for the current step — key to long-range context in transformers.',
      },
      {
        q: 'Higher temperature in sampling usually means…',
        choices: ['More random, diverse continuations', 'Strictly factual outputs', 'Smaller context windows'],
        correct: 0,
        feedback: 'Temperature scales randomness. Apps often use moderate values; creative writing may go higher.',
      },
      {
        q: 'Streaming a chat response means…',
        choices: [
          'Tokens appear gradually as they are generated',
          'The model downloads the entire internet first',
          'The user must refresh the page for each word',
        ],
        correct: 0,
        feedback: 'Streaming shows partial output early — the same token-by-token process you saw in the Guided Lab.',
      },
    ],
    recap: {
      heading: 'Section 04 complete — Beginner LLM core done',
      points: [
        { label: 'Pipeline', text: 'Text → tokens → embeddings → transformer layers → next-token prediction → readable text.' },
        { label: 'Limits', text: 'Context windows cap memory; models predict likely language — they do not automatically verify facts.' },
        { label: 'Guided Lab', text: 'Revisit “How are you?” on the AI home to walk the same pipeline on a real chat message end to end.' },
      ],
      labCallout: true,
    },
  },
}

export function getBeginnerModule(id) {
  return beginnerModules[id] || null
}
