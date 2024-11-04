#!/bin/bash

set -e  # Dừng lại ngay lập tức khi có lỗi

# Build service
docker build -t benzo203/nerdify_fe .

# Push service
docker login
docker push benzo203/nerdify_fe
