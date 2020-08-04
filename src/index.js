import "@babel/polyfill";
import OneEuroFilter from './oneEuroFilter';

export default class DeviceMotion {
    constructor(usingFilter = false, listenerFunc = null) {
        this.granted = false;
        this.usingFilter = usingFilter;
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

        this.filterV = {
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
            pitch: new Motion(this.usingFilter),
            roll: new Motion(this.usingFilter),
            yaw: new Motion(this.usingFilter)
        }
    }

    handleOrientation(event) {
        this.motion.pitch.calculate(event.beta);
        this.motion.roll.calculate(event.gamma);
        this.motion.yaw.calculate(event.alpha);

        // this.orient = {
        //     pitch: event.beta,
        //     roll: event.gamma,
        //     yaw: event.alpha,
        // }

        this.orient = {
            pitch: this.motion.pitch.p,
            roll: this.motion.roll.p,
            yaw: this.motion.yaw.p,
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

        // this.filterV = {
        //     pitch: this.motion.pitch.filterVal,
        //     roll: this.motion.roll.filterVal,
        //     yaw: this.motion.yaw.filterVal, 
        // }
    
        if (this.listenerFunc) this.listenerFunc(event);
    }

    setFilter(use) {
        this.usingFilter = use;
        this.motion.pitch.usingFilter = use;
        this.motion.roll.usingFilter = use;
        this.motion.yaw.usingFilter = use;
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

    constructor(usingFilter = false) {
        this.usingFilter = usingFilter;
        this.oeFilter = new OneEuroFilter(0.5);
        this.oeFilterV = new OneEuroFilter(0.5, 10, 1, 10);
    }

    calculate(value) {
        let now = Date.now();
        let timed = (now - this.lastTime) / 1000;
        if (this.usingFilter) {
            value = this.oeFilter.filter(value, now/1000);
        }
        this.lastP = this.p;
        this.lastV = this.v;
        this.lastA = this.a;
        this.p = value;

        this.v = (this.p - this.lastP) / timed;
        if (this.usingFilter) {
            this.v = this.oeFilterV.filter(this.v, now/1000);
        }
        this.a = (this.v - this.lastV) / timed;

        this.lastTime = now;
    }
}