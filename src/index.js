import "@babel/polyfill";
import OneEuroFilter from './oneEuroFilter';

export default class DeviceMotion {
    constructor(listenerFunc = null) {
        this.granted = false;
        this.orient = {
            pitch : 0,
            raw : 0,
            yaw : 0
        }
        this.orientVel = {
            pitch : 0,
            raw : 0,
            yaw : 0
        }
        this.orientAcc = {
            pitch : 0,
            raw : 0,
            yaw : 0
        }
        this.listenerFunc = listenerFunc;
    }

    async requestPermission() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                // iOS 13+
                let response;
                try {
                    response = await DeviceOrientationEvent.requestPermission()
                } catch(err) {
                    //handle hint page here
                    console.error(err);
                }
                
                if (response == 'granted') {
                    this.granted = this.addDeviceEvent();
                }
            
            } else {
                // non iOS 13+
                this.granted = this.addDeviceEvent();
            }
        }
        return this.granted;
    }

    
    addDeviceEvent() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", this.handleOrientation.bind(this), false);
            this.initAcc();
        } else {
            console.log("DeviceOrientationEvent is not supported");
            return false;
        }
        // if (window.DeviceMotionEvent) {
        //     window.addEventListener("devicemotion", handleMotion, true);
        // } else {
        //     alert('DeviceMotionEvent is not supported!');
        //     console.log("DeviceMotionEvent is not supported");
        //     return false;
        // }
        return true;
    }

    initAcc() {
        this.motion = {
            pitch: new Motion(),
            roll: new Motion(),
            yaw: new Motion()
        }
    }

    handleOrientation(event) {
        this.motion.pitch.calculate(event.beta);
        this.motion.roll.calculate(event.gamma);
        this.motion.yaw.calculate(event.alpha);

        this.orient = {
            pitch: event.beta,
            roll: event.gamma,
            yaw: event.alpha,
        }

        this.orientVel = {
            pitch: this.motion.pitch.v,
            roll: this.motion.roll.v,
            yaw: this.motion.yaw.v,
        }

        this.orientAcc = {
            pitch: this.motion.pitch.a,
            roll: this.motion.roll.a,
            yaw: this.motion.yaw.a,
        }
    
        if (this.listenerFunc) this.listenerFunc(event);
    }

}


class Motion {
    p = 0;
    v = 0;
    a = 0;
    lastP = 0;
    lastV = 0;
    lastA = 0;
    lastTime = Date.now();
    constructor() {

    }

    calculate(value) {
        let now = Date.now();
        let timed = (now - this.lastTime) / 1000;
        
        this.lastP = this.p;
        this.lastV = this.v;
        this.lastA = this.a;
        this.p = value ;

        this.v = (this.p - this.lastP) / timed;
        this.a = (this.v - this.lastV) / timed;

        this.lastTime = now;
    }
}