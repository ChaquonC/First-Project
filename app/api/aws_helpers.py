import boto3
import botocore
import os
import uuid

ALLOWED_IMAGE_EXTENSIONS = { "png", "jpg", "jpeg", }
ALLOWED_AUDIO_EXTENSIONS = { "mp3", "m4a", "wav", "flac", "ogg", "aac", "alac" }

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
key = os.environ.get("S3_KEY")
secret_key = os.environ.get("S3_SECRET")

s3 = boto3.client(
   "s3",
   aws_access_key_id=key,
   aws_secret_access_key=secret_key
)


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
