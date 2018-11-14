"use strict"

let decrypt = require('./decryption.js'),
    monogram = require('./monogram.js'),
    bigram = require('./bigrams.js'),
    particles = require('./initializePso.js'),
    friedman = require('./friedman.js')

function findFitness(dtxt) {
<<<<<<< HEAD
    let mSum = monogram.findMonogramSum(dtxt, 0.2),
    bSum = bigram.findBigramSum(dtxt, .8)
=======
    let mSum = monogram.findMonogramSum(dtxt, 0.23),
        bSum = bigram.findBigramSum(dtxt, .77)
>>>>>>> 60f4baadd7f4868fe1515c3f4f5017c00d3abebb
    return mSum + bSum
}

function subtractChar(chOne, chTwo) {
<<<<<<< HEAD
    return ((((chOne.charCodeAt(0) - 65) - (chTwo.charCodeAt(0) - 65))) % 26) 
=======
    return ((((chOne.charCodeAt(0) - 65) - (chTwo.charCodeAt(0) - 65)) + 26) % 26)
>>>>>>> 60f4baadd7f4868fe1515c3f4f5017c00d3abebb
}

function updateVelocity(particle, gBestKey, pBest) {
    for (let i = 0; i < particle.v.length; i++) {
<<<<<<< HEAD
        particle.rand1 = Math.random() * (1 - 0) + 0
        particle.rand2 = Math.random() * (1 - 0) + 0
        particle.v[i] = (Math.floor(particle.w * particle.v[i] + ( particle.c1 * particle.r1 * (subtractChar(pBest[i], particle.x[i])) ) + ( particle.c2 * particle.r2 * (subtractChar(gBestKey[i], particle.x[i])) )) % 26)
=======
        particle.v[i] = (Math.floor(particle.w * particle.v[i] + (particle.c1 * particle.r1) * (subtractChar(particle.pBest[i], particle.x[i])) + particle.c2 * particle.r2 * (subtractChar(particle.gBest.x[i], particle.x[i]))))
>>>>>>> 60f4baadd7f4868fe1515c3f4f5017c00d3abebb
    }
}

// Only call this function AFTER updating the velocity of a particle
function updatePosition(particle) {
    let xp = particle.x,
<<<<<<< HEAD
    vel = particle.v
    for (let i = 0; i < xp.length; i++) {
        if (vel[i] < 0) {
            xp[i] = String.fromCharCode( (((xp[i].charCodeAt(0) - 65)  + vel[i] + 26) % 26) + 65)
=======
        vel = particle.v

    for (let i = 0; i < xp.length; i++) {
        if (vel < 0) {
            xp[i] += String.fromCharCode((((xp[i].charCodeAt(0) - 65) + vel + 26) % 26) + 65)
>>>>>>> 60f4baadd7f4868fe1515c3f4f5017c00d3abebb
        } else {
            xp[i] = String.fromCharCode(((xp[i].charCodeAt(0) - 65) + vel[i]) % 26 + 65)

        }
    }
}

function updateGBest(particleLst, gBestNew) {
    for (let i = 0; i < particleLst.length; i++) {
        particleLst[i].gBest = gBestNew
    }
}

function psoMain(etxt, numParticles) {
    let particleLst = particles.generateParticles(numParticles, friedman.getEstKeyLen(etxt)[0]),
    gBestFitness = 100,
    gBestKey = ""

    // First run: Initializing the global best
    let particle = particleLst[0],
        dtxt = decrypt.decrypt(etxt, particle.x.join(""))
    particle.fitness = findFitness(dtxt)
    updateGBest(particleLst, particle)
    gBestFitness = findFitness(dtxt)
    gBestKey = particle.x.join("")

    let counter = 0
    while ( /* ((pgBest.fitness - encryptedFitness) < 3.5) || */ counter < 1000) {
        for (let j = 0; j < particleLst.length; j++) {

            let particle = particleLst[j],
            dtxt = "",
            fitness
            
            dtxt = decrypt.decrypt(etxt, particle.x.join(""))
            fitness = findFitness(dtxt)
            
            if ((fitness * 1000) < (gBestFitness * 1000)) {
                gBestKey = particle.x.join("")
                gBestFitness = fitness
                updateGBest(particleLst, particle)
            }
            if (fitness < findFitness(decrypt.decrypt(etxt, particle.pBest))) {
                particle.pBest = particle.x.join("")
            }

            updateVelocity(particle, gBestKey.split(""), particle.pBest.split(""))
            updatePosition(particle)
        }
        console.log(gBestKey, gBestFitness)
        ++counter
    }

    //return pgBest 
}

psoMain("IOIKWIYIFKXZAKEBWLWXTZTUEHLOXWDTELLXUGLLPAWGYAKOLLTYWAWTIESRTUCJCEAEVADYDARPUYGXWLRDECNUSKTAHWICNLAWWSAFKJHGWMHHVWVHHTAPTHNVVDIUKXAHNYYPNEUEEHBDIDMMSRNKIXJTYEFXIOIFKHVNWADBLVRDAEPTTJTLSQLTZIRHSW", 100)