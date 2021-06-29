class MemberHelper {
    static formatMemberId(stMember) {
        const distribId = parseInt(stMember.ucDistribId)
        let formattedDistribId

        if (distribId >= 16 && distribId < 32) {
            formattedDistribId = 'C' + (distribId % 16)
          } else if (distribId >= 32 && distribId < 64) {
            formattedDistribId = 'F' + (distribId % 32)
          } else if (distribId >= 64 && distribId < 128) {
            formattedDistribId = 'A' + (distribId % 64)
          }
          return `${stMember.ucAreaNo}-${formattedDistribId}-${stMember.ucAgencyId}-${stMember.ucMemCourId}`
        }
}

export default MemberHelper