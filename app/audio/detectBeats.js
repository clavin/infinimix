/** The size of energy blocks. */
const BlockSize = 1024;

/***********************************************************************************************************************
 * This algorithm is an adaptation of the algorithm described at:
 * http://mziccard.me/2015/05/28/beats-detection-algorithms-1/
 * which is based on the algorithm presented at:
 * http://archive.gamedev.net/archive/reference/programming/features/beatdetection/index.html
 * 
 * The algorithm is as follows:
 * 1. Break the audio up into block-sized chunks (the size of blocks are `BlockSize` [see top of file] samples).
 *    a. The theoretical value of a chunk is a sum of energy.
 *    b. The energy for a sample that's stereo is defined as the sum of the left channel squared and the right channel
 *       squared: left^2 + right^2
 *    c. The block-sized chunk is the sum of sample energies, i.e. sum from 0 to BlockSize of left^2 + right^2
 * 2. The energy of each chunk is then compared to the average energy for the energy of the last approximate second
 *    of blocks to determine if it's a beat.
 *    a. i.e. 43 blocks at 44,100 samples/second and a block size of 1024 since 43*1024 about = 44,100.
 *    b. The comparison that takes place is checking if the energy of the current block is bigger than the average
 *       multiplied by some amount.
 *       i. I took a cue from Ziccardi (the first article linked above) and decided to make the "some amount" be
 *          an equation based off the variance of the last second of blocks: `-0.0000015 * variance + 1.5142857`
 **********************************************************************************************************************/

/**
 * Detects the beats of a song (the indexes of the PCM data), given the song's PCM and sample rate. See the source file
 * for a description of the process.
 * @param {number[]} pcm - The stereo PCM of the song.
 * @param {number} sampleRate - The sample rate of the PCM.
 * @returns {number[]} - Indexes of the PCM that are beats.
 */
export default function detectBeats(pcm, sampleRate) {
  // TODO
}

