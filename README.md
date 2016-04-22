# Ftv::Components::Speaker

Angular module to display a speaker and a volume bar. This module will throw event on mute/unmute and volume change.

## Get sources

```
git clone git@gitlab.ftven.net:team-infini/ftv-angular-speaker.git
```

## How to use

Include javascript and css

```
<script src="dist/component.js"></script>
<link rel="stylesheet" href="dist/component.css">
```

In your template

```
<speaker></speaker>
```

## Events

* ftv-speaker-toggle: true if muted, false if not
* ftv-speaker-set-volume: volume in percentage (eg: 90 = 90%)
* ftv-speaker-dragging-start: when user click and hold volume bar
* ftv-speaker-dragging-stop: when user release volume bar

## Required dependencies

- [npm](https://nodejs.org/)
- [gem](https://rubygems.org/)

## Build process

```
sudo apt-get install ruby ruby-dev gem
npm install -g gulp

npm install

sudo gem install compass

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