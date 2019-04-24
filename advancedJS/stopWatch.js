function StopWatch(){
    let start = 0;
    let stop = 0;
    let duration = 0;

    this.start = function(){
        if(start > 0)
            throw new Error('Stop-watch already started');
        start = Date.now();
    }

    this.stop = function(){
        if(start == 0)
            throw new Error('Stop-watch already stopped');
        stop = Date.now();
        duration += (stop - start)/1000
        start = stop = 0
    }

    Object.defineProperty(this, 'duration', {  
        get: function(){
            return duration;
        }
    });

    this.reset = function(){
        start = stop = duration = 0
    }

}

const sw = new StopWatch();