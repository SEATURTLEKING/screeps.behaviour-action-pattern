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
if(Structures.spawns.hits = 0){
    if(room.roomName = 'E82S12' + 'E83S11' + 'E83S12'){
    }else{
        const ret = creep.say('We Won!!!!!!Yahoo!!!Congradulations!!!!');   
    }
    console.log(`creep.say(${creep.saying}): ${ret}`);
}
action.onAssignment = function(creep, target) {
    console.log('onAssignment working');
    if( SAY_ASSIGNMENT ) creep.say(String.fromCharCode(9929), SAY_PUBLIC);
};
