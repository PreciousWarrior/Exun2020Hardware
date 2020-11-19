var cluster = require('cluster')
var cpus = require('os').cpus().length

const aFloat = 0.689789456164784894561894894848489
const bFloat = 18974561.44848454654654898756456456
const timesRun = 1000000000

var totalTimesMultiCore = 0


function GetFloatingSingleCoreTimes(){
    //Returns execution time in milliseconds
    var start = new Date().getTime();
    for (var i = 0; i<timesRun; i++){
        aFloat * bFloat
    }
    var end = new Date().getTime()
    return end-start

}

function GetFloatingMultiCoreTimes(){
    var startTime = new Date().getTime();
    if (cluster.isMaster){
        for (var i = 0; i<cpus; i++){
            cluster.fork()
        }
        return "IGNORE THIS AND THE ABOVE LINE"
    }
    else{
        
        for (var i = 0; totalTimesMultiCore<timesRun/cpus; totalTimesMultiCore++){
            aFloat * bFloat
        }
        return new Date().getTime() - startTime
    }
    

}


console.log("(Lower is better) Single Core CPU score is-: " + GetFloatingSingleCoreTimes())
console.log("(Lower is better) Multi Core CPU score is-: " + GetFloatingMultiCoreTimes())

