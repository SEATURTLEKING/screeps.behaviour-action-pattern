let mod = {};
module.exports = mod;
mod.name = 'powerMiner';
mod.run = function(creep) {
    // Assign next Action
    if (!creep.action || creep.action.name === 'idle') this.nextAction(creep);
    // Do some work
    if( creep.action ) {
        creep.action.step(creep);
    } else {
        logError('Creep without action/activity!\nCreep: ' + creep.name + '\ndata: ' + JSON.stringify(creep.data));
    }
};
mod.nextAction = function(creep) {
    let target = FlagDir.find(FLAG_COLOR.invade.powerMining, creep.pos, false);
    const roomName = creep.data.destiny.room;
    let memory = Task.powerMining.memory(roomName);
    Population.registerCreepFlag(creep, target);

    let countExisting = type => {
        let invalidEntry = false;
        let running = _.map(memory.running[type], n => {
            let c = Game.creeps[n];
            if (!c) invalidEntry = true;
            return c;
        });
        if (invalidEntry) {
            Task.powerMining.validateRunning(roomName, type);
            running = _.map(memory.running[type], n => Game.creeps[n]);
        }
        let runningCount = _.filter(running, c => !Task.powerMining.needsReplacement(c)).length;
        return runningCount;
    };

    let healerCount = countExisting('powerHealer');

    //let powerHealer = Game.creeps[Creep.prototype.findGroupMemberByType("powerHealer", creep.data.flagName)];
    console.log('target ' + target + ' healercount ' + healerCount )
    if( !target ) {
        return Creep.action.recycling.assign(creep);
    } else if( healerCount < 2 ) {
        if( creep.pos.roomName != creep.data.homeRoom ) {
            return Creep.action.travelling.assignRoom(creep, creep.data.homeRoom);
        } else {
            return Creep.action.idle.assign(creep);
        }
    } else if( creep.pos.roomName === target.pos.roomName ) {
             if( creep.pos.getRangeTo(target) < 1 ) return Creep.action.invading; //creep.attacking = creep.attack(target) == OK;
    }
    if( creep.pos.getRangeTo(target) > 1 ) {
        return Creep.action.travelling.assign(creep, target);
    } else {
        Creep.action.idle.assign(creep);
    }
};
mod.strategies = {
    defaultStrategy: {
        name: `default-${mod.name}`,
        moveOptions: function(options) {
            // allow routing in and through hostile rooms
            if (_.isUndefined(options.allowHostile)) options.allowHostile = true;
            return options;
        }
    }
};
mod.selectStrategies = function(actionName) {
    return [mod.strategies.defaultStrategy, mod.strategies[actionName]];
};
