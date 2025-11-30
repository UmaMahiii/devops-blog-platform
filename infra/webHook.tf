resource "github_repository_webhook" "strapi" {
  repository = "devops-blog-platform"
  active     = true
  events     = ["push"]

  configuration {
    url          = "http://${aws_instance.strapi.public_ip}:9090/webhook"
    content_type = "json"
    secret       = var.webhook_secret
  }
}
