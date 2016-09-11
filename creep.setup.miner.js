var setup = new Creep.Setup('miner');
setup.multiBody = [WORK];
setup.fixedBody = [WORK, CARRY, MOVE];
setup.minAbsEnergyAvailable = 200;
setup.maxMulti = 4;
setup.sortedParts = false;
setup.minEnergyAvailable = function(spawn){
    return 0.3;
};
setup.maxCount = function(spawn){

    // Do not create in the middle of a fight unless we need to mine to survie.  Not sure about this one.  If we need a miner to build we are probably doomed anyway.
    if (spawn.room.situation.invasion && setup.EnoughStorageIsAvailableForDefense(spawn)) return 0; 
    
    return spawn.room.sources.length;
};
setup.maxWeight = function(spawn){
    return null;
};
module.exports = setup;