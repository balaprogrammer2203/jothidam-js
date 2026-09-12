import { KP_HORARY_DATA } from '../services/kpHoraryData.js';

console.log('Total KP Horary items generated:', KP_HORARY_DATA.length);
console.log('Item #1:', JSON.stringify(KP_HORARY_DATA[0], null, 2));
console.log('Item #249:', JSON.stringify(KP_HORARY_DATA[248], null, 2));

const lastItem = KP_HORARY_DATA[KP_HORARY_DATA.length - 1];
console.log(`Ends at degree: ${lastItem.endDegree}° (Expected: 360°)`);
console.log(`Matches 249 count: ${KP_HORARY_DATA.length === 249}`);
