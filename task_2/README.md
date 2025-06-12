# [Task 2] - Natural Language to Structured Bug Report
EDU AI Challenge

In this task, we’ll practice using prompt engineering and output formatting techniques to turn informal bug notes into clear, structured bug reports.
## Theory
**AI Technique**:  Prompt Engineering; Output Formatting; Natural Language Understanding
Modern AI assistants like ChatGPT excel at transforming unstructured inputs into clear, structured information — if given the right instructions. This task leverages the concept of **prompt engineering**, where carefully designed prompts guide the AI to produce consistent, useful results tailored to specific use cases.
A particularly important pattern here is **output formatting**, where the prompt must direct the AI to follow a strict structure (e.g., predefined sections in a bug ticket). Additionally, this task calls on **natural language understanding (NLU)**: the AI needs to interpret vague or informal notes, identify implicit meaning, and generate complete, actionable content. <br>

AI models can help developers create clear and complete ticket descriptions by turning simple inputs into formal, well-structured text. By using prompt engineering techniques, developers can provide context (like the type of ticket, relevant component, or observed issue) and have AI generate text that fits the conventions of tools like Jira, GitHub, or GitLab. This improves communication across teams and reduces the time spent writing and rewriting vague tickets.
 
## Task

You're in the middle of QA or development and come across a bug. You wrote down a quick note like:
*“Logout button doesn’t work on Safari. It just doesn’t respond.”*
This kind of informal note is common—but it's not enough for a developer to take action quickly. <br>

Design a prompt that instructs an AI assistant (like ChatGPT) to convert informal bug reports like this into a clear, well-structured bug ticket. The output should follow this format:
- Title
- Description
- Steps to Reproduce
- Expected vs Actual Behavior
- Environment (if known)
- Severity or Impact

## Verification
You need to provide **2 files**:
1. Prompt that you were using to achieve the described requirements(prompt.txt).
2. Result that you got using this prompt(result.md). <br>
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
## Requirements
1. The bug ticket description that you got using your prompt should align with all the requirements stated in task description
 
 