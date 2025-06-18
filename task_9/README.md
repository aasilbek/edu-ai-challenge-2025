# Service Analysis Tool

A powerful Python-based service analysis tool that generates comprehensive, markdown-formatted reports about services or products using OpenAI's GPT models. This tool provides detailed insights from multiple perspectives, helping users understand various aspects of a service or product.

## Features

- **Comprehensive Analysis**: Generates detailed reports including:
  - Brief History
  - Target Audience
  - Core Features
  - Unique Selling Points
  - Business Model
  - Tech Stack Insights
  - Perceived Strengths
  - Perceived Weaknesses
  - Market Position
  - Future Outlook

- **Flexible Input**: Accepts both service names and detailed descriptions
- **Markdown Output**: Generates well-formatted markdown reports
- **File Storage**: Automatically saves analyses to timestamped files
- **Configurable**: Customizable analysis parameters and sections
- **Error Handling**: Robust error handling and logging
- **Type Safety**: Full type hints and documentation

## Prerequisites

- Python 3.7 or higher
- OpenAI API key

## Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:aasilbek/edu-ai-challenge-2025.git
   cd task_9
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

### Basic Usage

1. Run the tool:
   ```bash
   python src/service_analyzer.py
   ```

2. Enter a service name (e.g., "Spotify") or paste a service description
3. Press Ctrl+D (Unix) or Ctrl+Z (Windows) followed by Enter to submit
4. The analysis will be displayed in the terminal and saved to a file

### Example Input

```
Spotify
A music streaming service that offers access to millions of songs, podcasts, and other content from artists all over the world.
```

### Example Output

The tool will generate a comprehensive analysis in markdown format, including all the sections mentioned in the Features section. The output will be both displayed in the terminal and saved to a file in the `outputs` directory.

## Configuration

The tool can be configured by modifying the `AnalysisConfig` class in `service_analyzer.py`:

- `model`: The OpenAI model to use (default: "gpt-4")
- `temperature`: Controls randomness in the output (default: 0.7)
- `max_tokens`: Maximum length of the generated analysis (default: 2000)
- `sections`: List of sections to include in the analysis

## Error Handling

The tool includes comprehensive error handling:
- API key validation
- Network error handling
- Input validation
- File system error handling

All errors are logged with appropriate context and user-friendly messages.

## Security

- Never commit your `.env` file
- The `.env` file is included in `.gitignore`
- API keys are loaded securely using python-dotenv

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT API
- The Python community for excellent libraries and tools 