let action = new Creep.Action('guarding');
module.exports = action;
action.isAddableAction = function(){ return true; };
action.isAddableTarget = function(){ return true; };
action.newTarget = function(creep){
    var flag;
    if( creep.data.destiny ) flag = Game.flags[creep.data.destiny.flagName];
    if ( !flag ) {
        flag = FlagDir.find(FLAG_COLOR.defense, creep.pos, false, FlagDir.rangeMod, {
            rangeModPerCrowd: 400
            //rangeModByType: creep.data.creepType
        });
    }

    if( creep.action && creep.action.name == 'guarding' && creep.flag )
        return creep.flag;
    if( flag ) Population.registerCreepFlag(creep, flag);
    return flag;
};
action.work = function(creep){
    if( creep.data.flagName )
        return OK;
    else return ERR_INVALID_ARGS;
};
//celebrate when the spawn is destroyed
/*if( Structure.spawns.hits = 0 && room.roomName != 'E82S12' + 'E83S11' + 'E83S12' ){
        creep.say('We Won!!!!!!Yahoo!!!Congradulations!!!!');
        console.log('It Is Working, Yahoooooo');
        console.log(`creep.say(${creep.saying}): ${ret}`);
}*/
action.onAssignment = function(creep, target) {
    console.log('on Assignment working');
    if( !room.find(FIND_SPAWN).lenght ){
        creep.say('We Won!!!'(String.fromCharCode(f388)(String.fromCharCode(f389)(String.fromCharCode(f38a)(String.fromCharCode(f387));
    }else{
         if( SAY_ASSIGNMENT ) creep.say(String.fromCharCode(9929), SAY_PUBLIC);
    }
};
