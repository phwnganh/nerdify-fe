#!/bin/bash

set -e  # Dừng lại ngay lập tức khi có lỗi

# Pull service
docker login
docker pull benzo203/nerdify_fe

# Run service
docker-compose up -d
