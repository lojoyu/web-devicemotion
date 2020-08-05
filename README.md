# Device Motion

This is a device orientation / velocity listener.

(Still in Development)

## How to use

### Import

```javascript
import DeviceMotion from '@zonesoundcreative/web-devicemotion'
```

### Usage

First, new an instance of Devicemotion with optional parameter.
```js
let deviceMotion = new DeviceMotion(smooth, listenerfunction);
```
Parameter:

* smooth: `BOOLEAN` Use one euro filter to smooth value or not.(default: false)

* listenerfunction: function be callback when device orientation has been read.

**READ DATA**

Access device motion data from deviceMotion instance. The datas are in JSON format.

```js
    //orientation
    deviceMotion.orient = {
        pitch : xxx,
        raw : xxx,
        yaw : xxx
    }

    //velocity of orientation
    deviceMotion.orientVel = {
        pitch : xxx,
        raw : xxx,
        yaw : xxx
    }

    //acceleration of orientation
    deviceMotion.orientAcc = {
        pitch : xxx,
        raw : xxx,
        yaw : xxx
    }
```
