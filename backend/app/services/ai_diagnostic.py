import anthropic
from app.config import settings
from typing import Dict, Any

def generate_diagnostic(face_attributes: Dict[str, Any]) -> str:
    """
    Use Claude API to generate a personality diagnostic based on facial physiognomy attributes.
    """
    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    prompt = f"""You are a creative personality insight generator for a fun social app called FacePairing. Based on someone's facial expression data captured from a photo, generate an engaging, positive, and uplifting personality profile. This is entertainment-focused — like a fun horoscope or personality quiz result.

Facial Expression & Appearance Data:
- Apparent Age: {face_attributes.get('age')}
- Gender Expression: {face_attributes.get('gender')}
- Dominant Expression: {face_attributes.get('emotion')}
- Expression Breakdown: {face_attributes.get('emotions')}
- Face Confidence Score: {face_attributes.get('face_confidence')}

Based on this snapshot, craft a fun and inspiring personality profile with these sections:
1. **Your Vibe** - The overall energy and personality aura this person radiates
2. **Emotional World** - How they experience and express emotions
3. **Social Style** - How they connect and communicate with others
4. **Hidden Strengths** - Unique talents and inner qualities they possess
5. **Growth Journey** - Exciting personal development opportunities ahead
6. **Your People** - The kinds of souls they connect with most deeply

Keep it warm, imaginative, empowering, and fun — like a personalized horoscope. Be specific and vivid, not generic."""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    return message.content[0].text
