import json
import numpy as np
from deepface import DeepFace
from typing import Dict, Any, Tuple

def analyze_face(image_path: str) -> Tuple[Dict[str, Any], list]:
    """
    Analyze facial attributes and extract embedding from an image.
    Returns (attributes_dict, embedding_list).
    """
    # Analyze facial attributes
    result = DeepFace.analyze(
        img_path=image_path,
        actions=["age", "gender", "emotion", "race"],
        enforce_detection=True,
        silent=True
    )

    if isinstance(result, list):
        result = result[0]

    def to_python(v):
        if isinstance(v, dict):
            return {k: to_python(val) for k, val in v.items()}
        if isinstance(v, (np.floating, np.integer)):
            return v.item()
        return v

    attributes = {
        "age": to_python(result.get("age")),
        "gender": result.get("dominant_gender"),
        "emotion": result.get("dominant_emotion"),
        "emotions": to_python(result.get("emotion", {})),
        "race": result.get("dominant_race"),
        "races": to_python(result.get("race", {})),
        "face_confidence": to_python(result.get("face_confidence")),
        "region": to_python(result.get("region", {})),
    }

    # Extract face embedding for matching
    embedding_result = DeepFace.represent(
        img_path=image_path,
        model_name="Facenet512",
        enforce_detection=True
    )
    embedding = embedding_result[0]["embedding"] if isinstance(embedding_result, list) else embedding_result["embedding"]

    return attributes, embedding


def cosine_similarity(vec1: list, vec2: list) -> float:
    a = np.array(vec1)
    b = np.array(vec2)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))
