resource "aws_instance" "strapi" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.small"
  vpc_security_group_ids = [aws_security_group.strapi_sg.id]
  key_name               = "strapi-key"

  tags = {
    Name = "devops-blog-strapi"
  }
}

