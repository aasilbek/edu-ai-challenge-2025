# [Task 5] - Few-Shot Prompting for Structured Feedback Analysis

EDU AI Challenge
In this task, we will practice the few-shot prompting technique and also revisit some techniques from the previous tasks, such as CoT reasoning and output formatting.

## Theory
**AI Technique**: Information Extraction; Classification; Few-Shot Prompting; Chain-of-Thought Reasoning; Structured Output Generation
**Few-shot learning** is an approach in machine learning where a model is trained (or prompted) to perform a new task using only a small number of examples. Instead of requiring thousands of labeled data points, as in traditional machine learning, few-shot learning can generalize from just a few instances—sometimes as few as one or two.
In the context of large language models (LLMs) like ChatGPT, few-shot learning typically involves providing a few examples directly in the prompt. This helps the model understand the desired format or behavior for generating the correct response.
This technique is extremely useful when:

- You don’t have enough training data.
- You want to quickly adapt a general model to a specific task.
- You need to prototype without fine-tuning a model.

Few-shot learning is a powerful way to **steer AI behavior** with minimal setup, making it perfect for challenges, rapid prototyping, and personalized AI interactions.
<u>Example</u>
In few-shot learning, the model is shown a few examples to learn the task pattern. Here's how it can classify customer feedback as Positive, Neutral, or Negative:
Prompt: Classify the sentiment of the following customer feedback as Positive, Neutral, or Negative:

1. "The app is super intuitive and runs smoothly!" — Positive
2. "It’s okay, but sometimes it lags." — Neutral
3. "I hate the latest update. Everything is broken!" — Negative
4. "I like the new design." —

Expected model output: Positive

## Task
 
The goal of this task is to practice advanced prompt engineering for classifying unstructured user feedback and extracting detailed insights.

Many services lack effective feedback loop systems. Such systems allow improvement of services / products with suggestions from millions of posts and comments. The main issue with developing such a system is creating an accurate feedback sorting mechanism. Your task is to design a prompt that enables AI to analyze product feedback comments and extract key insights in a structured JSON format that can be integrated with product team workflows. Given feedbacks are real and selected from reddit post.
You are provided with **three diverse examples** that demonstrate proper analysis:

```
Feedback 1: "I've never been a fan of the GPX shape and to me, it feels like I am holding a potato. The front hump felt a bit intrusive on the backside of my knucles. Ergonomics are better on the Viper V3 PRO specially on the rear portion of the mouse and the side part where you rest/grip your fingers to hold the mouse."
Expected analysis result :
{
  "sentiment": "Positive",
  "isRelevant": true,
  "mainSubject": "Ergonomics and shape (compared favorably to GPX)",
  "positives": [
    "Ergonomics are better on the Viper V3 PRO",
    "Better rear portion ergonomics",
    "Better side grip area"
  ],
  "painPoints": [],
  "improvementSuggestions": [],
  "featuresMentioned": [
    "Ergonomics",
    "Shape",
    "Rear design",
    "Side grip"
  ],
  "userExpertise": "Experienced"
}

Feedback 2: "If you are a GPX lover, I think they managed to improve everything I thought It was wrong about the GPX series, they made the shape better, they fixed the side buttons, scrolling wheel is better, gliding is faster and feels like the perfect compromise between control and speed."
Expected analysis result :
{
  "sentiment": "Positive",
  "isRelevant": true,
  "mainSubject": "Feature improvements over competitor (GPX)",
  "positives": [
    "Better shape than GPX series",
    "Improved side buttons",
    "Better scrolling wheel",
    "Faster gliding with good control-speed balance"
  ],
  "painPoints": [],
  "improvementSuggestions": [],
  "featuresMentioned": [
    "Shape",
    "Side buttons",
    "Scrolling wheel",
    "Gliding performance"
  ],
  "userExpertise": "Experienced"
}

Feedback 3: "I can't say I'm a fan of the material used for the shell, either—the plastic attracts fingerprints like a grease magnet and the mouse needed to be furiously cleaned, repeatedly, before any pictures could be taken. It also feels a bit on the cheap side, although that's mostly down to Razer's decision to make the Viper V3 Pro as light as possible."
Expected analysis result :
{
  "sentiment": "Negative",
  "isRelevant": true,
  "mainSubject": "Material quality and feel",
  "positives": [],
  "painPoints": [
    "Shell material attracts fingerprints excessively",
    "Requires frequent cleaning",
    "Material feels cheap",
    "Design prioritizes weight over premium feel"
  ],
  "improvementSuggestions": [
    "Use material that resists fingerprints better",
    "Improve perceived build quality while maintaining low weight"
  ],
  "featuresMentioned": [
    "Shell material",
    "Build quality feel",
    "Weight"
  ],
  "userExpertise": "Experienced"
}

```
Below are **two feedback samples** for you to work with:
- **Sample 1**: "Sensor just stops tracking for like a half second kinda often even at 8000hz. I've also tried it plugged in and still the same problem. First one I got I had to return also because the dongle just didnt work, $150 mouse btw"
- **Sample 2**: "Is it worth it? It is a product with no flaws in my opinion, if you love it go for it, but its not worth the price since you'll be able to perform the same with a cheaper product with half the specs." <br>

Your task is to craft a prompt that will guide the AI in analyzing the two feedback examples above using the following techniques and structure:

- **Few-Shot Prompting**: Incorporate the 3 provided examples to demonstrate the expected format and reasoning.
- **Chain-of-Thought Reasoning**: Instruct the AI to analyze the feedback only if it is relevant to the product. If not, set isRelevant to false and skip further analysis.
- **JSON Output Format**: Ensure the AI’s response adheres to the following structure:

```json
{
  "sentiment": "string (Positive|Negative|Neutral|Mixed)",
  "isRelevant": boolean,
  "mainSubject": "string or null",
  "positives": ["array of strings"],
  "painPoints": ["array of strings"],
  "improvementSuggestions": ["array of strings"],
  "featuresMentioned": ["array of strings"],
  "userExpertise": "string (Experienced|Novice|Unknown)"
}
```
## Verification
You need to provide **2 files**:
Prompt that you were using to achieve the described requirements(**prompt.txt**).
Result that you got using this prompt(**result.json**).
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
## Requirements
1. Your prompt must use the **Few-Shot Prompting** technique and incorporate **Chain-of-Thought (CoT) reasoning**.
2. The AI's analysis generated using your prompt should fully comply with the task description and must include:
- The specified **JSON structure**.
- **Sentiment analysis** of the feedback.
- **CoT-based decision-making**, especially when determining if the feedback is relevant (isRelevant field).