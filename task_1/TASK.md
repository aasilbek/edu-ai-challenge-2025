# [Task 1] - Practicing Chain-of-Thought Reasoning
EDU AI Challenge
In this task we will be practicing Chain-of-Thought Reasoning prompting technique to select a proper Database for Application.
## Theory
**AI Technique**: Chain-of-Thought Reasoning <br>
**Chain-of-Thought (CoT)** reasoning is an approach used in prompting AI models to think step-by-step, mimicking how humans often solve complex problems. Instead of jumping straight to an answer, the AI is encouraged to break down the problem into logical steps, leading to more accurate and explainable outcomes. <br>
This technique is especially useful when:

- The answer depends on multiple factors
- Reasoning and justification are required
- The goal is to trace how a conclusion was reached

<u>Example: </u>

*Question*: If a train travels 60 km in 1.5 hours, what is its average speed?
**Without CoT**:
→ 40 km/h
**With CoT**:
→ The train travels 60 km in 1.5 hours.
→ Speed is calculated as distance divided by time.
→ 60 ÷ 1.5 = 40.
→ **Answer**: 40 km/h
Even for a simple question, CoT makes the logic transparent and reduces the chance of mistakes—especially useful for more complex tasks.
## Task
You are selecting a database for a new application. You have the following requirements: <br>
- Social platform with millions of users
- Need to store profiles, posts, and connections between users
- High data read speed required
- Expected 80% read operations, 20% write operations
- Scalability is important as the user base grows <br>
 
Using ChatGPT UI, DeepSeek, or any other conversational AI tool, craft a prompt that instructs the assistant to apply **Chain-of-Thought (CoT) reasoning** in order to:
1. Analyze a given set of project requirements
2. Justify and select the most suitable **type of database** for the project <br>

The AI's reasoning should be step-by-step and well-structured, clearly showing how the decision was made based on the requirements.
 
## Verification
You need to provide **2 files**:
1. Prompt that you were using to achieve the described requirements(prompt.txt).
2. Result that you got using this prompt(result.txt). <br>

Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
## Requirements
1. Your prompt should use Chain-of-Thought reasoning
2. The analysis that you got using your prompt should align with all the requirements stated in task description
 
 