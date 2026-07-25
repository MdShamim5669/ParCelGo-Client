/**
 * Calculates the total delivery price based on parcel details.
 * 
 * @param {number} weight - The weight of the parcel in kg.
 * @param {string} type - The type of the parcel ('document' or 'non-document').
 * @param {string} senderRegion - The region of the sender.
 * @param {string} receiverRegion - The region of the receiver.
 * @returns {number} The calculated price in BDT.
 */
export const calculatePrice = (weight, type, senderRegion = '', receiverRegion = '') => {
    const parcelWeight = Number(weight) || 0;
    
    // 1. If weight is 0 or not provided, return 0 to avoid showing fake estimated costs
    if (parcelWeight <= 0) {
        return 0;
    }
    
    // 2. Determine if it's Inside City (Same Region) or Inter-City (Different Regions)
    const isSameRegion = senderRegion && receiverRegion 
        ? senderRegion.trim().toLowerCase() === receiverRegion.trim().toLowerCase() 
        : true; // If regions aren't provided yet, default to inside city pricing
    
    // 3. Base Price (includes first 1 KG)
    // Standard BD courier rates: 60 BDT inside city, 120 BDT outside city
    let basePrice = isSameRegion ? 60 : 120; 
    
    // 4. Extra Weight Charge (for weight > 1 KG)
    let extraWeight = Math.max(0, parcelWeight - 1);
    // Ceiling the extra weight (e.g. 1.2kg -> 2kg total -> 1kg extra)
    let extraWeightCharge = isSameRegion 
        ? Math.ceil(extraWeight) * 15  // +15 BDT per extra KG inside city
        : Math.ceil(extraWeight) * 30; // +30 BDT per extra KG outside city
        
    // 5. Type Charge
    let typeCharge = 0;
    if (type !== 'document') {
        typeCharge = 20; // Extra handling fee for non-documents/parcels
    }

    return basePrice + extraWeightCharge + typeCharge;
};
