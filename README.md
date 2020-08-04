# Recorder

This is a recorder using Web Audio API.

(Still in Development)

Buffer Length is 1024, sample rate is using WebAudio default sample rate.

## How to use

### Import

```javascript
import Recorder from 'recorder.min.js'
```

### Usage

First, new an instance of Recorder with media streaming source.
```js
let recorder = new Recorder(source)
```
One example of getting streaming source:
```js
//init audio context
let AudioContext = window.AudioContext|| window.webkitAudioContext;
let context = new AudioContext();

var handleSuccess = function(stream) {
    // get source (put your own stream)
    let source = context.createMediaStreamSource(stream);
    ...
}

//ask for recording permission
navigator.mediaDevices.getUserMedia({ audio: true}).then(handleSuccess)
```

**RECORD**

```js
//start a new record
recorder.record()

//or to resume your recording
recorder.record(false);
```

**STOP**

```js
recorder.stop()
```

**PLAY**

play the recorded buffer.
```js
recorder.play()
```

**GET BUFFER**

get the recorded buffer.
```js
recorder.getBuffer()
```