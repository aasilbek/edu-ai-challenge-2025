#!/usr/bin/env python3
"""
Service Analysis Tool - A comprehensive service analysis generator using OpenAI's GPT models.
"""

import os
import sys
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, List
import logging
from dataclasses import dataclass
from openai import OpenAI
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@dataclass
class AnalysisConfig:
    """Configuration for the analysis generation."""
    model: str = "gpt-4.1-mini"
    temperature: float = 0.7
    max_tokens: int = 2000
    sections: List[str] = None

    def __post_init__(self):
        if self.sections is None:
            self.sections = [
                "Brief History",
                "Target Audience",
                "Core Features",
                "Unique Selling Points",
                "Business Model",
                "Tech Stack Insights",
                "Perceived Strengths",
                "Perceived Weaknesses",
                "Market Position",
                "Future Outlook"
            ]

class ServiceAnalyzer:
    """Main class for service analysis generation."""

    def __init__(self, api_key: Optional[str] = None):
        """Initialize the analyzer with OpenAI API key."""
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ValueError("OpenAI API key is required")
        
        self.client = OpenAI(api_key=self.api_key)
        self.config = AnalysisConfig()
        self.output_dir = Path("outputs")
        self.output_dir.mkdir(exist_ok=True)

    def generate_analysis(self, service_name: str, description: Optional[str] = None) -> Dict:
        """Generate comprehensive analysis for a service."""
        try:
            prompt = self._create_prompt(service_name, description)
            response = self._call_openai(prompt)
            return self._process_response(response, service_name)
        except Exception as e:
            logger.error(f"Error generating analysis: {str(e)}")
            raise

    def _create_prompt(self, service_name: str, description: Optional[str] = None) -> str:
        """Create the analysis prompt."""
        sections_str = "\n".join(f"- {section}" for section in self.config.sections)
        
        prompt = f"""Analyze the following service or product and provide a comprehensive markdown-formatted report.
        Include all of these sections:
        {sections_str}

        Service Name: {service_name}
        """
        
        if description:
            prompt += f"\nAdditional Description: {description}"
        
        prompt += "\n\nProvide the analysis in markdown format with clear section headers."
        return prompt

    def _call_openai(self, prompt: str) -> str:
        """Call OpenAI API with the prompt."""
        try:
            response = self.client.chat.completions.create(
                model=self.config.model,
                messages=[
                    {"role": "system", "content": "You are a professional service/product analyst with expertise in business, technology, and market analysis."},
                    {"role": "user", "content": prompt}
                ],
                temperature=self.config.temperature,
                max_tokens=self.config.max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            raise

    def _process_response(self, response: str, service_name: str) -> Dict:
        """Process the API response and save to file."""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{service_name.lower().replace(' ', '_')}_{timestamp}.md"
        filepath = self.output_dir / filename

        # Save the analysis to a file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(response)

        logger.info(f"Analysis saved to {filepath}")
        return {
            "content": response,
            "filepath": str(filepath)
        }

def main():
    """Main entry point for the service analyzer."""
    try:
        # Load environment variables
        load_dotenv()

        # Initialize analyzer
        analyzer = ServiceAnalyzer()

        print("Service Analysis Tool")
        print("====================")
        print("Enter a service name (e.g., 'Spotify') or paste a service description text.")
        print("Press Ctrl+D (Unix) or Ctrl+Z (Windows) followed by Enter to submit.")
        print("\nInput:")
        
        # Read multiline input
        lines = []
        try:
            while True:
                line = input()
                lines.append(line)
        except EOFError:
            pass
        
        input_text = "\n".join(lines)
        
        if not input_text.strip():
            print("Error: No input provided")
            sys.exit(1)

        # Split input into service name and description
        parts = input_text.split('\n', 1)
        service_name = parts[0].strip()
        description = parts[1].strip() if len(parts) > 1 else None
        
        print("\nGenerating analysis...\n")
        result = analyzer.generate_analysis(service_name, description)
        print(result["content"])
        print(f"\nAnalysis saved to: {result['filepath']}")

    except Exception as e:
        logger.error(f"Application error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 