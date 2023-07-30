// ========================================
// DEFAULT OPTIONS
// ========================================
const lightOptions = {
    fractalOptions: {
        background: 88,
        colours: [55, 99, 36, 85, 70, 15],
        stroke: 150,
        strokeWeight: 2.5,
        maxDepth: 3,
        minPoints: 3,
        maxPoints: 10,
        shadowOffset: 3,
        allowInitialGem: true,
    },
    gemOptions: {
        shadowOpacity: 45,
        shadowX: 10,
        shadowY: 6,
        shadowBlur: 10,
        rotation: -Math.PI / 2,
        outlines: true,
    }
}

const darkOptions = {
    fractalOptions: {
        background: 5,
        colours: [55, 99, 36, 85, 70, 15],
        stroke: 15,
        strokeWeight: 2.5,
        maxDepth: 3,
        minPoints: 3,
        maxPoints: 10,
        shadowOffset: 3,
        allowInitialGem: true,
    },
    gemOptions: {
        shadowOpacity: 65,
        shadowX: 0,
        shadowY: 0,
        shadowBlur: 50,
        rotation: -Math.PI / 2,
        outlines: true,
    }
}


// ========================================
// THEME OPTIONS
// ========================================
const desert = {
    background: '#ba6657',
    colours: [100, 95, 10, 5],
    stroke: '#e6998c',
    strokeWeight: 2.5,
    maxDepth: 3,
    minPoints: 3,
    maxPoints: 10,
    shadowOffset: 3,
    allowInitialGem: true,
}

const atlantis = {
    background: '#0e1a40',
    colours: [50, 55, 60, 65, 70, 75],
    stroke: '#325670',
    strokeWeight: 2.5,
    maxDepth: 2,
    minPoints: 7,
    maxPoints: 21,
    shadowOffset: 3,
    allowInitialGem: true,
}

const forest = {
    background: '#293b25',
    colours: [35, 40, 45],
    stroke: '#86b37b',
    strokeWeight: 2.5,
    maxDepth: 1,
    minPoints: 3,
    maxPoints: 5,
    shadowOffset: 3,
    allowInitialGem: true,
}

const pixels = {
    background: '#000000',
    colours: [0, 33, 66],
    stroke: '#222',
    strokeWeight: 2.5,
    maxDepth: 8,
    minPoints: 4,
    maxPoints: 4,
    shadowOffset: 3,
    allowInitialGem: true,
}

const christmas = {
    background: '#fff',
    colours: [0, 33],
    stroke: '#ddd',
    strokeWeight: 1,
    maxDepth: 6,
    minPoints: 35,
    maxPoints: 45,
    shadowOffset: 1,
    allowInitialGem: true,
}

const goodygoodygumdrops = {
    background: '#A0D0A8',
    colours: [99, 36, 15, 5, 90],
    stroke: '#C3E3C5',
    strokeWeight: 1,
    maxDepth: 3,
    minPoints: 3,
    maxPoints: 10,
    shadowOffset: 1,
    allowInitialGem: true,
    allowGems: false
}

const cottonCandy = {
    background: '#fff',
    colours: [55, 89],
    stroke: '#ddd',
    strokeWeight: 2.5,
    maxDepth: 3,
    minPoints: 5,
    maxPoints: 12,
    shadowOffset: 3,
    allowInitialGem: true,
}

const graveyard = {
    background: 88,
    colours: [0],
    stroke: 150,                      
    strokeWeight: 2.5,                     
    maxDepth: 3,
    minPoints: 3,
    maxPoints: 10,
    shadowOffset: 1.5,
    allowInitialGem: false,
    allowGems: false,
}


// ========================================
// GEM OPTIONS
// ========================================
const spinningGems = {
    shadowOpacity: 45,
    shadowX: 30,
    shadowY: 15,
    shadowBlur: 40,
    outlines: true,
}

const pixelGems = {
    shadowOpacity: 45,
    shadowX: 30,
    shadowY: 15,
    shadowBlur: 40,
    rotation: Math.PI / 4,
    outlines: true,
}

const christmasGems = {
    shadowOpacity: 25,
    shadowX: 5,
    shadowY: 5,
    shadowBlur: 20,
    rotation: -Math.PI / 2,
    outlines: false,
}