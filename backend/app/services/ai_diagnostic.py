import anthropic
from app.config import settings
from typing import Dict, Any

def generate_diagnostic(face_attributes: Dict[str, Any]) -> str:
    """
    Use Claude API to generate a personality diagnostic based on facial physiognomy attributes.
    """
    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    prompt = f"""You are an expert in physiognomy and personality analysis. Based on the following facial analysis data, provide a detailed personality diagnostic report.

Facial Analysis Data:
- Estimated Age: {face_attributes.get('age')}
- Gender Expression: {face_attributes.get('gender')}
- Dominant Emotion: {face_attributes.get('emotion')}
- Emotion Distribution: {face_attributes.get('emotions')}
- Ethnic Background: {face_attributes.get('race')}

Based on physiognomy principles and facial feature analysis, provide:
1. **Core Personality Traits** - Key personality characteristics suggested by facial features
2. **Emotional Intelligence** - Emotional tendencies and awareness
3. **Social Dynamics** - How this person likely interacts with others
4. **Strengths** - Natural talents and positive traits
5. **Growth Areas** - Potential areas for personal development
6. **Compatible Personalities** - Types of people they harmonize best with

Keep the tone positive, insightful, and empowering. Base your analysis on established physiognomy principles."""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    return message.content[0].text
