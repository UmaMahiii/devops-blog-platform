resource "aws_db_subnet_group" "strapi" {
  name       = "strapi-db-subnets"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "strapi-db-subnets"
  }
}

resource "aws_db_instance" "strapi" {
  identifier             = "strapi-db"
  engine                 = "postgres"
  engine_version         = "14.5"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  db_name                = "strapidb"
  username               = "strapi_user"
  password               = "StrapiPass123!"
  db_subnet_group_name   = aws_db_subnet_group.strapi.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  publicly_accessible    = true
  skip_final_snapshot    = true
}
