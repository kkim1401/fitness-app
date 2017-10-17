export function assertObjects(createdObj, expectedObj) {
    for (const trait in expectedObj) {
        if (expectedObj.hasOwnProperty(trait)) {
            switch (true) {
                case Array.isArray(expectedObj[trait]):
                    /* Map function returns id for each workout/exercise if it doesn't already return id.
                    Used for populate method in GET. */
                    const arrayById = createdObj[trait].map(elem => elem._id || elem);
                    expect(arrayById).toEqual(expectedObj[trait]);
                    break;
                case typeof expectedObj[trait] === "object":
                    assertObjects(createdObj[trait], expectedObj[trait]);
                    break;
                default:
                    expect(createdObj[trait]).toBe(expectedObj[trait]);
                    break;
            }
        }
    }
}