const { raceEventModel } = require('../models');

describe('insert', () => {
    test('should insert a race doc into collection', async () => {
        const mockRace = {
            event: "start",
            horse: {
                id: 1,
                name: "Dazzle"
            },
            time: 0
        };
        await raceEventModel.create(mockRace);
        const insertedRace = await raceEventModel.findOne({ event: "start", "horse.id": 1 });
        expect(insertedRace.event).toEqual(mockRace.event);
        expect(insertedRace.horse.id).toEqual(mockRace.horse.id);
        expect(insertedRace.horse.name).toEqual(mockRace.horse.name);
    });
});