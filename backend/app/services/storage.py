import boto3
from botocore.exceptions import ClientError
from app.config import settings
import uuid

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
)

def upload_image_to_s3(file_path: str, original_filename: str) -> str:
    """Upload a local image file to S3 and return the public URL."""
    ext = original_filename.rsplit(".", 1)[-1] if "." in original_filename else "jpg"
    key = f"faces/{uuid.uuid4()}.{ext}"

    s3_client.upload_file(
        file_path,
        settings.S3_BUCKET_NAME,
        key,
        ExtraArgs={"ContentType": f"image/{ext}"}
    )

    url = f"https://{settings.S3_BUCKET_NAME}.s3.amazonaws.com/{key}"
    return url
