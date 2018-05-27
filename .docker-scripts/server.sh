#!/bin/bash

bundle install --path=vendor/bundle -j4
npm install
rm /myapp/tmp/pids/server.pid
bundle exec rails s -b 0.0.0.0 -p 3000
