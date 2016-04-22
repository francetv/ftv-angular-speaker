FTVEN - Speaker
========================

Speaker module

# Get sources

```
git clone git@gitlab.ftven.net:team-infini/ftv-angular-speaker.git
```

# Required dependencies

- [npm](https://nodejs.org/)
- [gem](https://rubygems.org/)

# Installation process

```
sudo apt-get install ruby ruby-dev gem
npm install -g gulp

npm install
gem update --system
gem install compass

gulp build
```

# Development build for front web only

```
gulp build-dev-watch
```

## Demo

```
npm install -g http-server
gulp build
http-server
```

Open [demo](http://127.0.0.1:8080/demo.html)