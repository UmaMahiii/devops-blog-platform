variable "github_token" {
  type        = string
  description = "GitHub personal access token for Terraform GitHub provider"
}

variable "webhook_secret" {
  type        = string
  description = "GitHub webhook secret"
}
