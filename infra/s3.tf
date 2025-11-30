resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "strapi_s3" {
  bucket = "strapi-media-${random_id.bucket_suffix.hex}"

  tags = {
    Name = "strapi-media"
  }
}

resource "aws_s3_bucket_public_access_block" "strapi_s3" {
  bucket = aws_s3_bucket.strapi_s3.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = true
}
