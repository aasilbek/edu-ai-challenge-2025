# [Task 4] - Effective PR Review using Role Prompting
EDU AI Challenge
In this task, we will practice role prompting—an AI technique where you direct the model to adopt a specific expert persona.

## Theory
**AI Technique**: Role Prompting
**Role prompting** is an AI technique that directs a model to adopt a specific persona, character, or expert perspective when generating a response or performing a task. By assigning the model a particular role—such as a seasoned security expert, an experienced senior software developer, a meticulous technical writer, or even a specific fictional character—we can elicit responses that are more specialized, contextually relevant, and aligned with the nuances of that chosen role.
How it Works: When a role is assigned, the AI leverages its vast training data to simulate the knowledge, language style, and reasoning patterns associated with that role. For instance, if prompted to act as a "cybersecurity analyst," the model will prioritize information and perspectives related to security vulnerabilities, threat assessment, and mitigation strategies. This doesn't mean the AI becomes that expert, but rather it filters and focuses its output through the lens of the designated persona. The prompt essentially sets a strong contextual anchor, guiding the AI's generation process to produce content consistent with the specified role's typical concerns, priorities, and communication style. <br>
<u>Example: Human Resources Scenario </u>
Imagine you have an existing draft of a company-wide communication about a new remote work policy and you want it reviewed. Using role prompting, you could ask the AI to analyze this draft from these perspectives: <br>

- As an HR Director reviewing the draft:
    - Evaluate the clarity of the policy rationale, completeness of legal compliance statements, and potential impact on company culture.
    - Assess if the tone is authoritative yet supportive.
    - Check if responsibilities for both employees and managers under the new policy are clearly and accurately outlined.
- As an Employee Engagement Specialist reviewing the draft:
    - Analyze how the communicated policy might affect morale and work-life balance.
    - Identify if the draft adequately addresses potential concerns about team cohesion and isolation, suggesting improvements.
    - Ensure the tone is empathetic, encouraging, and fosters a sense of support.
- As a Legal Compliance Officer (within HR) reviewing the draft:
    - Scrutinize the draft to ensure the policy, as described, adheres to all relevant labor laws and regulations.
    - Identify any potential legal risks, ambiguities, or omissions in the communication.
    - Verify that the language used is precise, unambiguous, and correctly highlights critical legal aspects.
<br>
This technique is especially useful when expertise in a specific domain is required for a nuanced answer, or when a multi-faceted analysis of a problem is needed to ensure thoroughness.

## Task
You've submitted code for review and received feedback that seems superficial. You need to use AI to get a deeper analysis of your code from different perspectives.
Your task is to craft a prompt using the following instructions: <br>

- **Choose one of the provided** *processUserData* function implementations as the target for your AI-driven review:
    - processUserData.java
    - processUserData.js
    - processUserData.py
    - processUserData.cs
    - processUserData.go

- **Define Expert Roles and Analysis Focus** - Your prompt must instruct the AI to adopt the following three expert personas sequentially, providing an analysis from each viewpoint. The focus areas for each role could be as <u>an Experienced Developer,  a Security Engineer,  a Performance Specialist.</u>
- **Create the Prompt** - The prompt must clearly instruct the AI to:
    - Take the provided code snippet as input.
    - Analyze it from each of the three specified expert perspectives (Developer, Security Engineer, Performance Specialist).
    - For each perspective, provide specific, actionable recommendations and observations to improve the code. <br>

## Verification
You need to provide **2 files**:

1. Prompt that you were using to achieve the described requirements(**prompt.txt**).
2. Result that you got using this prompt(**result.md**).
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
## Requirements
1. The analysis in result should align all the requirements in the task description: <br>

- Provide distinct and relevant feedback for each of the three roles.
- Cover the specified focus areas for each role.
- Offers actionable and specific recommendations, not just generic statements.

 