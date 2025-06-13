# [Task 3] - Text Summarization and Sentiment Analysis
EDU AI Challenge
In this task, we’ll practice using chat interface to craft prompts for text summarization and sentiment analysis, mastering techniques to achieve precise outputs without API integration.
 
## Theory
**AI Technique**: Text Summarization; Sentiment Analysis
This task focuses on using **prompting techniques** with the **OpenAI online chat interface** (e.g., ChatGPT) to perform text summarization and sentiment analysis. You will practice crafting effective prompts to achieve specific outputs without the need for API integration. <br>
**Text Summarization**: the process of condensing a large body of text into a shorter version while retaining its essential meaning and key information. This can be achieved via two main approaches:

- **Extractive Summarization**: Selecting and combining key sentences or phrases from the original text.
- **Abstractive Summarization**: Generating new sentences and paraphrasing the content for conciseness.

**Sentiment Analysis**: a natural language processing (NLP) technique used to determine the emotional tone of a given piece of text. It identifies whether the sentiment is:

- **Positive**: Reflecting optimism or satisfaction.
- **Neutral**: Lacking strong emotional indicators.
- **Negative**: Reflecting dissatisfaction, criticism, or pessimism.

Sentiment scores are often represented numerically, where:

- **-1** indicates very negative sentiment.
- **0** indicates neutral sentiment.
- **+1** indicates very positive sentiment.

<u> Example 1 </u>
- Text: "I love how easy this app is to use. Great job!"
- Sentiment: Positive
- Score: +1
<u> Example 2 </u>
- Text: "The website keeps crashing every time I try to log in."
-  Sentiment: Negative
- Score: -1
 
## Task
In this task, you are given a raw text input task_3_input.docx. Your goal is to craft a prompt for an AI assistant to perform the following:
Generate a concise summary of the input text.
- Analyze the sentiment and classify it as **positive**, **neutral**, or **negative**.
- Provide a **sentiment score** (e.g., -1 for very negative, 0 for neutral, +1 for very positive).
- Return the results in a **structured JSON format**, including all of the above and any relevant metadata you deem useful.

## Verification
You need to provide **2 files**:
Prompt that you were using to achieve the described requirements(**prompt.txt**).
Result that you got using this prompt(**result.json**).
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
## Requirements
The result that you got using your prompt should align with all the requirements stated in the task description.

 