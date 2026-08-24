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
      preview: {
        title: 'Mini trace',
        trace: { input: '4', operation: 'double()', output: '8' },
        shapes: ['42 = number', '"hello" = text', '[1, 2, 3] = list'],
        outcome: 'trace any step as input → operation → output, including later AI calls.',
      },
      blocks: [
        {
          kind: 'why',
          body: 'Every AI pipeline—training, inference, or a chat API—is a chain of these steps. Recognizing the pattern lets you debug “bad output” by checking what went in and which operation ran.',
        },
        {
          kind: 'example',
          body: 'A photo app: your image file goes in, a resize function runs, a smaller JPEG comes out. Same skeleton as model.predict(features).',
        },
      ],
    },
    learn: [
      {
        heading: 'Input → operation → output',
        body: 'Every useful step — including AI — follows the same skeleton. The operation might be averaging numbers, resizing an image, or running a neural network.',
        interaction: 'io-flow',
        blocks: [
          {
            kind: 'behind',
            placement: 'before',
            trace: { input: 'user message', operation: 'chat API', output: 'assistant reply' },
            body: 'Apps wrap many internal steps, but you still think in terms of what you send and what you get back.',
          },
          {
            kind: 'misconception',
            body: '“The model just knows the answer” skips the input step. There is always data entering the system—even if it is hidden inside the app as a system prompt plus your message.',
          },
          {
            kind: 'deeper',
            body: 'Batches are lists of examples processed together for speed. A batch of 32 house rows is still a list shape—just nested inside a table structure.',
          },
        ],
      },
    ],
    experiment: {
      heading: 'Run one small operation',
      body: 'Pick a scenario and trace data through a named operation. You are practicing the habit of naming input, operation, and output—not memorizing syntax.',
      interaction: 'operation-runner',
      blocks: [
        {
          kind: 'why',
          body: 'Libraries and APIs exist so you reuse tested operations. When you call average(scores), you are not “doing math magically”—you are handing shaped data to a named step.',
        },
        {
          kind: 'example',
          body: 'Spreadsheet SUM(range) is the same idea: selected cells in, addition operation, total out.',
        },
      ],
    },
    quizIntro: 'These checks confirm you can spot inputs, operations, and outputs—the habit every later module builds on.',
    quiz: [
      {
        q: 'In every useful computation, what must exist before you see a result?',
        choices: ['Only a fancy algorithm name', 'Input data passed into an operation', 'A printed error message'],
        correct: 1,
        feedback: 'Correct: something goes in, an operation runs, a result comes out. Even “instant” AI replies follow this—your message is the input.',
        whyNot: {
          0: 'A name alone produces nothing. The operation needs data to work on.',
          2: 'Errors can appear, but a successful result always follows input plus an operation.',
        },
      },
      {
        q: 'Which example has a “list” shape — many values in one container?',
        choices: ['42', '["apple", "banana", "cherry"]', '"hello"'],
        correct: 1,
        feedback: 'Correct: a list holds multiple items in order. Token sequences and mini-batches of training examples are also list-shaped—just larger.',
        whyNot: {
          0: '42 is a single number—a scalar, not a collection.',
          2: '"hello" is one string—a single text value, not a container of many items.',
        },
      },
      {
        q: 'Why call a library function like average(numbers)?',
        choices: [
          'To hide input data forever',
          'To pass your data into a ready-made, tested operation',
          'Because Python refuses to add two numbers otherwise',
        ],
        correct: 1,
        feedback: 'Correct: libraries package operations so you focus on inputs and outputs. Model APIs work the same way—you send structured data, you receive structured results.',
        whyNot: {
          0: 'You still choose and inspect inputs; libraries do not erase them.',
          2: 'Basic math works without libraries—libraries add reusable, tested building blocks.',
        },
      },
    ],
    recap: {
      heading: 'Section 00 complete',
      points: [
        { label: 'Pattern', text: 'Every step takes input, runs an operation, and returns output—including LLM calls.' },
        { label: 'Shapes', text: 'Numbers, text, and lists are different containers; AI scales this to batches and token sequences.' },
        { label: 'Libraries', text: 'Named functions and APIs mean “pass shaped data into a ready-made operation.”' },
      ],
      canExplain: [
        'Why a chat reply still fits input → operation → output',
        'The difference between a single number, a string, and a list',
        'Why libraries and APIs matter before you touch a model',
      ],
      nextConnection: 'Module 01 maps AI vocabulary and shows how table rows become model inputs—building directly on shapes and operations.',
    },
  },

  '01': {
    id: '01',
    title: 'AI map & Python refresh',
    objective: {
      heading: 'Place AI on a map and read a dataset',
      body: 'Clarify AI vs ML vs deep learning vs generative AI. Then see how Python tools (NumPy, Pandas) organize numbers into tables you can feed to models—without writing code yourself.',
      bullets: [
        'Sort terms from broad AI down to generative models',
        'Identify features, labels, and inference on a tiny table',
        'Trace one row from input columns to a prediction',
      ],
      preview: {
        title: 'One table row',
        trace: { input: 'sqft, beds, age', operation: 'predict()', output: '$420k' },
        outcome: 'read a dataset row and name features, labels, and inference.',
      },
      blocks: [
        {
          kind: 'why',
          body: 'Teams argue about “AI features” without shared vocabulary. Knowing where ML and generative AI sit prevents calling every tool an LLM.',
        },
        {
          kind: 'example',
          body: 'Spam filtering = classic ML on email features. A chat assistant = generative AI. Both are AI, but the data and operations differ.',
        },
      ],
    },
    learn: [
      {
        heading: 'The AI family tree',
        body: 'Terms nest inside each other. Generative AI is a slice of deep learning, which is a slice of machine learning, which sits inside the broader field of AI.',
        interaction: 'ai-taxonomy',
        blocks: [
          {
            kind: 'misconception',
            placement: 'before',
            body: 'Not all AI learns from data. Rule-based chess engines and hand-written recommender rules count as AI but are not machine learning.',
          },
          {
            kind: 'why',
            body: 'Product decisions depend on this map: you would not train a giant language model just to sort spam if a smaller classifier suffices.',
          },
        ],
      },
      {
        heading: 'Tables, features, and labels',
        body: 'Most beginner ML starts with a spreadsheet-like dataset: columns you measure (features) and sometimes a column you want to predict (label).',
        interaction: 'dataset-table',
        blocks: [
          {
            kind: 'example',
            placement: 'before',
            body: 'House listings: sqft and beds are features; price is the label when training a price predictor.',
          },
          {
            kind: 'behind',
            body: 'NumPy stores numeric grids efficiently; Pandas adds row/column labels so you can select features without losing track of meaning.',
            tags: ['NumPy = fast arrays', 'Pandas = labeled tables'],
          },
          {
            kind: 'deeper',
            body: 'Training reads many rows to learn patterns. Inference applies those patterns to one new row—the same columns, but the label is what you want the model to output.',
          },
        ],
      },
    ],
    experiment: {
      heading: 'Trace one prediction',
      body: 'Select a row from a tiny house-price dataset. Watch features go in and a predicted price come out — that final step is inference, not training.',
      interaction: 'inference-trace',
      blocks: [
        {
          kind: 'why',
          body: 'Production ML spends most of its life in inference—serving predictions. Training is the upfront phase where weights or rules are learned.',
        },
        {
          kind: 'misconception',
          body: 'Inference is not “the model learning from this row.” Weights stay fixed; the model applies what it already learned.',
        },
      ],
    },
    quizIntro: 'Focus on vocabulary and the training vs inference split—you will reuse both in every later module.',
    quiz: [
      {
        q: 'Which statement is most accurate?',
        choices: [
          'All AI systems are large language models',
          'Machine learning is one approach inside the broader field of AI',
          'Deep learning excludes neural networks',
        ],
        correct: 1,
        feedback: 'Correct: AI is the umbrella. ML learns patterns from data; deep learning uses neural networks; generative AI creates new content.',
        whyNot: {
          0: 'LLMs are one kind of AI. Spam filters, robots, and rule engines are also AI.',
          2: 'Deep learning is defined by neural networks with many layers—it does not exclude them.',
        },
      },
      {
        q: 'In a supervised learning table, what is a “feature”?',
        context: 'Imagine columns: sqft, beds, age, price.',
        choices: ['The answer we want to predict', 'An input column the model uses', 'A row that leaked from the test set'],
        correct: 1,
        feedback: 'Correct: features are measurable inputs—size, age, word counts. The label (e.g., price) is the target column when training.',
        whyNot: {
          0: 'That describes the label—the column you predict—not the input features.',
          2: 'Rows are examples; leakage is a different problem about future information in features.',
        },
      },
      {
        q: 'NumPy/Pandas mainly help you…',
        choices: [
          'Replace the need for any model',
          'Store and shape numeric data before it reaches an operation',
          'Generate text without a network',
        ],
        correct: 1,
        feedback: 'Correct: they organize numbers into arrays and tables so models receive consistent, labeled shapes—without you writing low-level loops.',
        whyNot: {
          0: 'They prepare data; the model (or API) still performs the prediction step.',
          2: 'Text generation requires a model—NumPy/Pandas handle numeric/tabular structuring.',
        },
      },
      {
        q: '“Inference” means…',
        choices: [
          'Updating weights during training',
          'Using a trained model to produce an output for new input',
          'Deleting half your dataset',
        ],
        correct: 1,
        feedback: 'Correct: training adjusts the model on historical rows; inference applies it to fresh data—like predicting a price for a new listing.',
        whyNot: {
          0: 'Weight updates happen during training, not inference.',
          2: 'Dataset size changes are a data-prep choice, unrelated to the definition of inference.',
        },
      },
    ],
    recap: {
      heading: 'Section 01 complete',
      points: [
        { label: 'Vocabulary', text: 'AI ⊃ ML ⊃ deep learning; generative AI creates new text, images, or code.' },
        { label: 'Data', text: 'Features are input columns; labels are targets in supervised learning.' },
        { label: 'Tools', text: 'NumPy/Pandas shape tabular data; the model step is still input → operation → output.' },
      ],
      canExplain: [
        'Where generative AI sits on the AI map',
        'The difference between features and a label on one table row',
        'Why inference is not the same as training',
      ],
      nextConnection: 'Module 02 picks the right ML task type and teaches honest train/validation/test splits.',
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
      preview: {
        title: 'Pick the task type',
        trace: { input: 'email text', operation: 'classify()', output: 'spam / not spam' },
        outcome: 'match real problems to regression, classification, or clustering.',
      },
      blocks: [
        {
          kind: 'why',
          body: 'Choosing the wrong task type sends you down the wrong metrics and models. Product questions map cleanly once you name the output shape.',
        },
        {
          kind: 'example',
          body: 'Tomorrow’s temperature → regression (a number). Fraud yes/no → classification. Grouping shoppers with no labels → clustering.',
        },
      ],
    },
    learn: [
      {
        heading: 'Supervised vs unsupervised',
        body: 'Supervised learning uses labeled examples. Unsupervised learning finds structure without a provided answer column.',
        interaction: 'supervised-unsupervised',
        blocks: [
          {
            kind: 'example',
            placement: 'before',
            body: 'Labeled emails for spam training = supervised. Grouping customers by behavior with no “true segment” column = unsupervised.',
          },
          {
            kind: 'misconception',
            body: 'Unsupervised does not mean “no human involvement.” You still choose features and interpret the groups—it just lacks a label column to predict.',
          },
        ],
      },
      {
        heading: 'Three common task shapes',
        body: 'Regression predicts a number, classification picks a category, clustering groups similar items with no label column.',
        interaction: 'ml-task-matcher',
        blocks: [
          {
            kind: 'why',
            body: 'Metrics follow the task: mean error for regression, accuracy or precision/recall for classification, silhouette or manual review for clustering.',
          },
          {
            kind: 'deeper',
            body: 'Imbalanced classification (rare fraud) makes accuracy misleading—a model that always says “not fraud” can look accurate while failing the business goal.',
          },
        ],
      },
    ],
    experiment: {
      heading: 'Split data without cheating',
      body: 'Pick a splitting strategy for a product scenario. Some choices leak future information or waste data — learn to spot them before trusting a score.',
      interaction: 'split-scenario',
      blocks: [
        {
          kind: 'behind',
          trace: { input: 'train + validate', operation: 'tune model', output: 'pick settings' },
          body: 'Validation guides choices. The test set simulates the future—touch it once at the end.',
        },
        {
          kind: 'misconception',
          body: 'A high test score after many test-set peeks is not honest generalization—you tuned to the test without meaning to.',
        },
      ],
    },
    quizIntro: 'These questions focus on task types, splits, and leakage—failure modes that show up in real ML projects.',
    quiz: [
      {
        q: 'Which problem is classification?',
        choices: ['Predict tomorrow’s temperature', 'Spam vs not spam', 'Group customers by behavior with no labels'],
        correct: 1,
        feedback: 'Correct: classification chooses among categories. Temperature is regression; unlabeled grouping is clustering.',
        whyNot: {
          0: 'Temperature is a numeric prediction—regression.',
          2: 'Without labels to predict, grouping similar items is clustering.',
        },
      },
      {
        q: 'Why hold out a test set you touch only once at the end?',
        choices: [
          'To make training slower',
          'To estimate performance on unseen data you did not tune against',
          'Because models cannot use training rows',
        ],
        correct: 1,
        feedback: 'Correct: validation helps you tune; the test set estimates real-world performance. Reusing it for decisions inflates scores.',
        whyNot: {
          0: 'Training speed is unrelated—the split is about honest measurement.',
          2: 'Models learn from training rows by design—that is not why we hold out a test set.',
        },
      },
      {
        q: 'Data leakage means…',
        choices: [
          'The dataset file is public',
          'Information from the future or target sneaks into features',
          'The model is too small',
        ],
        correct: 1,
        feedback: 'Correct: leakage gives the model hints it would not have in production—like using “refund issued” to predict fraud that already happened.',
        whyNot: {
          0: 'Public data is a privacy concern, not leakage in the ML sense.',
          2: 'Model size affects capacity, not whether future information contaminates features.',
        },
      },
      {
        q: 'A sensible accuracy metric for a spam filter helps you…',
        choices: [
          'Measure how often the predicted label matches the true label on labeled examples',
          'Count lines of Python',
          'Guarantee zero mistakes in production',
        ],
        correct: 0,
        feedback: 'Correct: accuracy is one classification metric—useful when classes are balanced. Fraud and medical cases often need precision/recall instead.',
        whyNot: {
          1: 'Code volume does not measure model quality.',
          2: 'No single metric guarantees perfect production performance.',
        },
      },
    ],
    recap: {
      heading: 'Section 02 complete',
      points: [
        { label: 'Tasks', text: 'Regression → number; classification → category; clustering → groups without labels.' },
        { label: 'Splits', text: 'Train to learn, validate to tune, test once to estimate real performance.' },
        { label: 'Leakage', text: 'If a feature would not exist at prediction time, it must not be in training.' },
      ],
      canExplain: [
        'Which task type fits a given product question',
        'Why validation and test sets serve different jobs',
        'What leakage looks like in plain language',
      ],
      nextConnection: 'Module 03 opens the neural network box—how layers and loss actually implement the learning you have been describing.',
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
      preview: {
        title: 'Layers learn patterns',
        trace: { input: 'pixel values', operation: 'layers + weights', output: 'cat or dog' },
        outcome: 'follow data through layers and connect loss to weight updates.',
      },
      blocks: [
        {
          kind: 'why',
          body: 'Deep learning powers vision, speech, and language models. Understanding weights, loss, and epochs explains why training takes time and why models can overfit.',
        },
        {
          kind: 'example',
          body: 'Photo tagging: pixel brightness values enter, layered math transforms them, a label like “cat” exits.',
        },
      ],
    },
    learn: [
      {
        heading: 'One neuron, many layers',
        body: 'Each unit combines inputs with weights, adds a bias, then applies an activation to keep signals usable. Layers stack these units to learn richer patterns.',
        interaction: 'neuron-layers',
        blocks: [
          {
            kind: 'behind',
            placement: 'before',
            trace: { input: 'x₁, x₂', operation: 'Σ w·x + bias → activation', output: 'signal to next layer' },
            body: 'One neuron is simple math repeated thousands of times in parallel.',
          },
          {
            kind: 'misconception',
            body: 'A neuron is not “a brain cell that understands cats.” It is a weighted sum plus a nonlinearity—understanding emerges from many stacked units.',
          },
        ],
      },
      {
        heading: 'Loss, gradients, and epochs',
        body: 'Loss scores error. Training nudges weights to reduce loss. Gradient descent is the nudging strategy; backpropagation figures out which weights to change.',
        interaction: 'training-concepts',
        blocks: [
          {
            kind: 'why',
            body: 'Loss is the feedback signal. Without it, the network has no direction for improvement—like grading a test so the student knows what to fix.',
          },
          {
            kind: 'deeper',
            body: 'Backprop applies the chain rule layer by layer—it is efficient math for “which weight caused this error,” not magic intuition.',
          },
        ],
      },
    ],
    experiment: {
      heading: 'Tune a tiny training run',
      body: 'Pick a learning rate and number of epochs. See qualitative outcomes — not exact math — for stable learning vs chaos vs slow progress vs overfitting.',
      interaction: 'training-simulator',
      blocks: [
        {
          kind: 'example',
          body: 'Learning rate too high: loss jumps around. Too low: progress crawls. Too many epochs: training loss keeps falling while validation loss rises—overfitting.',
        },
        {
          kind: 'misconception',
          body: 'More epochs always help is false. Extra epochs can memorize noise instead of learning patterns that generalize.',
        },
      ],
    },
    quizIntro: 'Conceptual checks only—no formulas required. Focus on what each piece does in the training story.',
    quiz: [
      {
        q: 'What do weights in a neural network primarily control?',
        choices: ['How strongly each input influences the next computation', 'The color of charts', 'The file name of the dataset'],
        correct: 0,
        feedback: 'Correct: weights scale inputs. Training adjusts them so outputs better match targets— that IS what “learning” means here.',
        whyNot: {
          1: 'Visualization choices do not change model computation.',
          2: 'File names are metadata, not learnable parameters.',
        },
      },
      {
        q: 'Loss is best described as…',
        choices: ['A measure of how wrong the model’s predictions are', 'The number of layers', 'The learning rate'],
        correct: 0,
        feedback: 'Correct: training tries to minimize loss—the gap between prediction and target (exact formula depends on the task).',
        whyNot: {
          1: 'Layer count is architecture, not error measurement.',
          2: 'Learning rate controls step size, not the error score itself.',
        },
      },
      {
        q: 'A learning rate that is too high often causes…',
        choices: ['Stable, slow improvement every time', 'Wild swings or failure to settle', 'Automatic overfitting prevention'],
        correct: 1,
        feedback: 'Correct: oversized steps overshoot good weights. Too small a rate learns slowly but can be more stable.',
        whyNot: {
          0: 'Wild instability is the opposite of stable improvement.',
          2: 'Overfitting relates to epochs and capacity, not learning rate alone.',
        },
      },
      {
        q: 'Overfitting means…',
        choices: [
          'The model memorizes training quirks and weakens on new data',
          'The dataset is too large',
          'Activation functions are disabled',
        ],
        correct: 0,
        feedback: 'Correct: the model fits noise in training data. Validation loss rising while training loss falls is a classic warning sign.',
        whyNot: {
          1: 'Large datasets usually help generalization—they do not define overfitting.',
          2: 'Activations are required for deep networks to learn nonlinear patterns.',
        },
      },
    ],
    recap: {
      heading: 'Section 03 complete',
      points: [
        { label: 'Structure', text: 'Layers of weighted sums + activations transform inputs step by step.' },
        { label: 'Training', text: 'Loss guides weight updates via gradient descent over many epochs.' },
        { label: 'Generalization', text: 'Watch validation loss—memorizing training noise hurts new data.' },
      ],
      canExplain: [
        'What weights, loss, and epochs each do in plain language',
        'Why learning rate and epoch count matter qualitatively',
        'How overfitting differs from healthy learning',
      ],
      nextConnection: 'Module 04 applies these ideas to language: tokens, attention, and next-token prediction in chat apps.',
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
      preview: {
        title: 'Chat pipeline',
        trace: { input: 'How are you?', operation: 'tokenize → predict', output: "I'm doing well…" },
        outcome: 'follow text from tokens through transformers to a streamed reply.',
      },
      blocks: [
        {
          kind: 'why',
          body: 'Chat apps feel instant and authoritative. Tracing the pipeline explains streaming, context limits, and why fluent text can still be wrong.',
        },
        {
          kind: 'example',
          body: 'The Guided Lab walks “How are you?” through this exact path—your message in, tokens out one at a time, readable reply assembled on screen.',
        },
      ],
    },
    learn: [
      {
        heading: 'Tokens, IDs, and embeddings',
        body: 'Text becomes tokens, tokens become IDs, IDs become vectors (embeddings). Embeddings let the model do math over language—similar usage often lands nearby in vector space, but context still changes meaning.',
        interaction: 'token-pipeline',
        blocks: [
          {
            kind: 'misconception',
            placement: 'before',
            body: 'Embeddings are not dictionary definitions stored as numbers. They are learned representations useful for prediction in context—not guaranteed factual knowledge.',
          },
          {
            kind: 'behind',
            trace: { input: '"running"', operation: 'tokenizer → ID → embedding', output: 'vector used in layers' },
            body: 'The same word form can get different embeddings depending on surrounding tokens.',
          },
        ],
      },
      {
        heading: 'Attention, transformers, and context windows',
        body: 'Attention lets each token weigh other tokens in the window. Transformers stack this mechanism. A context window caps how much text the model can consider at once.',
        interaction: 'attention-context',
        blocks: [
          {
            kind: 'why',
            body: 'Attention is why pronouns and long instructions can work—the model can relate distant pieces of your prompt when producing the next token.',
          },
          {
            kind: 'example',
            body: 'If your prompt mentions a policy at the top and asks a question at the bottom, attention helps later tokens “look back” within the window.',
          },
          {
            kind: 'deeper',
            body: 'Context windows are hard limits. Text beyond the window is invisible to that request—apps use summarization or retrieval to work around this.',
          },
        ],
      },
    ],
    experiment: {
      heading: 'Next-token choices and temperature',
      body: 'Given a partial sentence, compare likely next tokens. Temperature controls randomness — lower is safer and more predictable; higher is more varied.',
      interaction: 'sampling-lab',
      blocks: [
        {
          kind: 'why',
          body: 'Models output probabilities over possible next tokens. Sampling turns those probabilities into a choice—temperature scales how adventurous that choice is.',
        },
        {
          kind: 'misconception',
          body: 'Lower temperature does not mean “true answers.” It means narrower, more predictable wording—facts still need verification or tools.',
        },
      ],
    },
    quizIntro: 'These tie directly to the Guided Lab pipeline—tokens, context, sampling, and streaming.',
    quiz: [
      {
        q: 'A token is…',
        choices: ['Always one full English word', 'A chunk of text the model reads — often a word or piece of one', 'A database row'],
        correct: 1,
        feedback: 'Correct: tokenization splits text into model-sized pieces. “running” might be one token or split depending on the vocabulary.',
        whyNot: {
          0: 'Many languages and subwords split differently—tokens are not always whole words.',
          2: 'Tokens are text chunks for the model, not database records.',
        },
      },
      {
        q: 'Embeddings represent tokens as…',
        choices: ['Vectors of numbers used for computation in context', 'Plain dictionary definitions', 'Random UUIDs'],
        correct: 0,
        feedback: 'Correct: embeddings are numeric representations learned for prediction. Nearby vectors can reflect similar usage, but they are not stored definitions.',
        whyNot: {
          1: 'Definitions are human-readable text—embeddings are math-friendly representations.',
          2: 'UUIDs identify records; embeddings encode usage patterns for the model.',
        },
      },
      {
        q: 'Attention helps a model…',
        choices: [
          'Focus on relevant parts of the input when producing each token',
          'Skip the context window entirely',
          'Guarantee factual answers',
        ],
        correct: 0,
        feedback: 'Correct: attention weights which tokens matter for the current step—key to long prompts within the window.',
        whyNot: {
          1: 'Attention works inside the window—it does not remove the limit.',
          2: 'Attention improves coherence; it does not verify facts against the world.',
        },
      },
      {
        q: 'Higher temperature in sampling usually means…',
        choices: ['More random, diverse continuations', 'Strictly factual outputs', 'Smaller context windows'],
        correct: 0,
        feedback: 'Correct: temperature scales randomness. Creative writing may use higher values; factual assistants often use moderate or lower values—but verification still matters.',
        whyNot: {
          1: 'Factuality is not controlled by temperature alone.',
          2: 'Context window size is a separate architecture and deployment limit.',
        },
      },
      {
        q: 'Streaming a chat response means…',
        choices: [
          'Tokens appear gradually as they are generated',
          'The model downloads the entire internet first',
          'The user must refresh the page for each word',
        ],
        correct: 0,
        feedback: 'Correct: streaming shows partial output early—the same token-by-token process as the Guided Lab, delivered incrementally to the UI.',
        whyNot: {
          1: 'Models do not browse the web unless tools are explicitly connected.',
          2: 'Streaming is automatic token delivery—no manual refresh per word.',
        },
      },
    ],
    recap: {
      heading: 'Section 04 complete — Beginner LLM core done',
      points: [
        { label: 'Pipeline', text: 'Text → tokens → embeddings → transformer layers → next-token prediction → readable text.' },
        { label: 'Limits', text: 'Context windows cap memory; fluent language ≠ verified facts.' },
        { label: 'Guided Lab', text: 'Replay “How are you?” on the AI home to see the full pipeline on one chat message.' },
      ],
      canExplain: [
        'What tokens and embeddings do—and what embeddings are not',
        'Why attention and context windows matter in chat',
        'How temperature and streaming affect what users see',
      ],
      nextConnection: 'You have the Beginner LLM core. Intermediate modules will go deeper on training, RAG, tools, and production—when they ship.',
      labCallout: true,
    },
  },
}

export function getBeginnerModule(id) {
  return beginnerModules[id] || null
}
