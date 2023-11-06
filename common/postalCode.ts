/* eslint-disable no-useless-escape */

export const POSTCODE_REGEX = {
  AD: /^AD\d{3}$/,
  AF: /^\d{4}$/,
  AI: /^(AI-2640)$/,
  AL: /^\d{4}$/,
  AM: /^(\d{4})|(\d{6})$/,
  AQ: /^(7151)$/,
  AR: /^([A-Z]\d{4}[A-Z]{3})|([A-Z]\d{4})$/,
  AS: /^967\d{2}(-\d{4})?$/,
  AT: /^\d{4}$/,
  AU: /^\d{4}$/,
  AZ: /^(AZ)(\d{4})|(AZ )(\d{4})$/,
  BA: /^\d{5}$/,
  BB: /^BB\d{5}$/,
  BD: /^\d{4}$/,
  BE: /^\d{4}$/,
  BF: /^[1-9]\d{4}$/,
  BG: /^\d{4}$/,
  BH: /^\d{3}\d?$/,
  BM: /^[A-Z]{2} \d{2}$/,
  BN: /^[A-Z]{2}\d{4}$/,
  BR: /^[0-9]{5}-[0-9]{3}$/,
  BT: /^\d{5}$/,
  BY: /^\d{6}$/,
  CA: /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/,
  CC: /^(6799)$/,
  CH: /^[1-9]\d{3}$/,
  CL: /^\d{7}$/,
  CN: /^\d{6}$/,
  CO: /^\d{6}$/,
  CR: /^\d{5}$/,
  CU: /^(CP)?\d{5}$/,
  CV: /^\d{4}$/,
  CX: /^(6798)$/,
  CY: /^[1-9]\d{3}$/,
  CZ: /^[1-7][0-9]{2} [0-9]{2}|[1-7][0-9]{4}$/,
  DE: /^\d{5}$/,
  DK: /^\d{4}$/,
  DO: /^\d{5}$/,
  DZ: /^\d{5}$/,
  EC: /^\d{6}$/,
  EE: /^\d{5}$/,
  EG: /^\d{5}$/,
  ES: /^\d{5}$/,
  ET: /^\d{4}$/,
  FI: /^\d{5}$/,
  FK: /^(FIQQ 1ZZ)$/,
  FM: /^9694\d{1}(-\d{4})?$/,
  FO: /^\d{3}$/,
  FR: /^\d{5}$/,
  GB: /^([G][I][R] 0[A]{2})|((([A-Z][0-9]{1,2})|(([A-Z][A-HJ-Y][0-9]{1,2})|(([A-Z][0-9][A-Z])|([A-Z][A-HJ-Y][0-9]?[A-Z])))) [0-9][A-Z]{2})$/,
  GE: /^\d{4}$/,
  GG: /^(GY)([0-9][0-9A-HJKPS-UW]?|[A-HK-Y][0-9][0-9ABEHMNPRV-Y]?) [0-9][ABD-HJLNP-UW-Z]{2}$/,
  GI: /^(GX11 1AA)$/,
  GL: /^39\d{2}$/,
  GN: /^\d{3}$/,
  GR: /^(\d{3}) \d{2}|\d{5}$/,
  GS: /^(SIQQ 1ZZ)$/,
  GT: /^\d{5}$/,
  GU: /^((969)[1-3][0-2])(-\d{4})?$/,
  GW: /^\d{4}$/,
  HK: /^(999077)$/,
  HM: /^(7151)$/,
  HN: /^\d{5}$/,
  HR: /^[1-5]\d{4}$/,
  HT: /^(HT)(\d{4})|(HT) (\d{4})$/,
  HU: /^[1-9]\d{3}$/,
  ID: /^[1-9]\d{4}$/,
  IL: /^\d{7}$/,
  IM: /^(IM)([0-9][0-9A-HJKPS-UW]?|[A-HK-Y][0-9][0-9ABEHMNPRV-Y]?) [0-9][ABD-HJLNP-UW-Z]{2}$/,
  IN: /^[1-9]\d{5}$/,
  IO: /^(BB9D 1ZZ)$/,
  IQ: /^\d{5}$/,
  IR: /^\d{5}[\-]?\d{5}$/,
  IS: /^[1-9]\d{2}$/,
  IT: /^\d{5}$/,
  JE: /^JE[0-9]{1}[\s]([\d][A-Z]{2})$/,
  JM: /^(JM)[A-Z]{3}\d{2}$/,
  JO: /^\d{5}$/,
  JP: /^(\d{3}-\d{4})$/,
  KE: /^\d{5}$/,
  KG: /^\d{6}$/,
  KH: /^\d{5,6}$/,
  KI: /^KI\d{4}$/,
  KN: /^KN\d{4}(\-\d{4})?$/,
  KR: /^\d{5}$/,
  KW: /^\d{5}$/,
  KY: /^[K][Y][0-9]{1}[-]([0-9]){4}$/,
  KZ: /^([A-Z]\d{2}[A-Z]\d[A-Z]\d)|(\d{6})$/,
  LA: /^\d{5}$/,
  LB: /^\d{4}( \d{4})?$/,
  LC: /^LC\d{2} {2}\d{3}$/,
  LI: /^\d{4}$/,
  LK: /^\d{5}$/,
  LR: /^\d{4}$/,
  LS: /^\d{3}$/,
  LT: /^((LT)[\-])?(\d{5})$/,
  LU: /^((L)[\-])?(\d{4})$/,
  LV: /^((LV)[\-])?(\d{4})$/,
  MA: /^[1-9]\d{4}$/,
  MD: /^(MD[\-]?)?(\d{4})$/,
  ME: /^\d{5}$/,
  MG: /^\d{3}$/,
  MH: /^((969)[6-7][0-9])(-\d{4})?$/,
  MK: /^\d{4}$/,
  MM: /^\d{5}$/,
  MN: /^\d{5}$/,
  MP: /^9695\d{1}(-\d{4})?$/,
  MS: /^MSR\d{4}$/,
  MT: /^[A-Z]{3} [0-9]{4}|[A-Z]{2}[0-9]{2}|[A-Z]{2} [0-9]{2}|[A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9]{2}|[A-Z]{3} [0-9]{2}$/,
  MU: /^([0-9A-R]\d{4})$/,
  MV: /^\d{5}$/,
  MW: /^\d{6}$/,
  MX: /^\d{5}$/,
  MY: /^\d{5}$/,
  MZ: /^\d{4}$/,
  NA: /^\d{5}$/,
  NC: /^988\d{2}$/,
  NE: /^\d{4}$/,
  NF: /^(2899)$/,
  NG: /^[1-9]\d{5}$/,
  NI: /^\d{5}$/,
  NL: /^[1-9]\d{3} [A-Z]{2}|[1-9]\d{3}[A-Z]{2}$/,
  NO: /^\d{4}$/,
  NP: /^\d{5}$/,
  NR: /^(NRU68)$/,
  NU: /^(9974)$/,
  NZ: /^\d{4}$/,
  OM: /^\d{3}$/,
  PA: /^\d{4}$/,
  PE: /^\d{5}$/,
  PF: /^((987)\d{2})$/,
  PG: /^\d{3}$/,
  PH: /^\d{4}$/,
  PK: /^[1-9]\d{4}$/,
  PL: /^[0-9]{2}[-]([0-9]){3}$/,
  PN: /^(PCR9 1ZZ)$/,
  PS: /^(P[1-9]\d{6})|(\d{3}-\d{3})$/,
  PT: /^[1-9]\d{3}((-)\d{3})$/,
  PW: /^(96939|96940)$/,
  PY: /^\d{4}$/,
  RO: /^\d{6}$/,
  RS: /^\d{5,6}$/,
  RU: /^\d{6}$/,
  SA: /^[1-8]\d{4}([\-]\d{4})?$/,
  SD: /^\d{5}$/,
  SE: /^[1-9]\d{2} \d{2}$/,
  SG: /^\d{6}$/,
  SH: /^(ASCN 1ZZ|TDCU 1ZZ|STHL 1ZZ)$/,
  SI: /^[1-9]\d{3}$/,
  SK: /^(\d{3} \d{2})|\d{5}$/,
  SM: /^(4789\d)$/,
  SN: /^[1-8]\d{4}$/,
  SS: /^\d{5}$/,
  SV: /^\d{4}$/,
  SZ: /^([A-Z]\d{3})$/,
  TC: /^(TKCA 1ZZ)$/,
  TH: /^\d{5}$/,
  TJ: /^7\d{5}$/,
  TM: /^7\d{5}$/,
  TN: /^\d{4}$/,
  TR: /^\d{5}$/,
  TT: /^\d{6}$/,
  TW: /^(\d{3}\-\d{3})|(\d{3}[-]\d{2})|(\d{6})|(\d{3})$/,
  TZ: /^\d{5}$/,
  UA: /^\d{5}$/,
  US: /^\d{5}(-\d{4})?$/,
  UY: /^[1-9]\d{4}$/,
  UZ: /^\d{6}$/,
  VA: /^(00120)$/,
  VC: /^(VC)(\d{4})$/,
  VE: /^[1-8]\d{3}$/,
  VG: /^(VG11)[0-6][0]$/,
  VI: /^008\d{2}(-\d{4})?$/,
  VN: /^\d{6}$/,
  WF: /^(986)\d{2}$/,
  WS: /^WS[1-2]\d{3}$/,
  ZA: /^\d{4}$/,
  ZM: /^\d{5}$/,
}
export const postCodeExample = {
  AD :'AD459',
  AF :'2558',
  AI :'AI-2640',
  AL :'0487',
  AM :'950980',
  AQ :'7151',
  AR :'T4944',
  AS :'96721-3447',
  AT :'9790',
  AU :'6745',
  AZ :'AZ 0968',
  BA :'84039',
  BB :'BB66863',
  BD :'2879',
  BE :'9536',
  BF :'41172',
  BG :'3873',
  BH :'7125',
  BM :'TA 49',
  BN :'JG3822',
  BR :'99057-999',
  BT :'59979',
  BY :'777879',
  CA :'A2V 5U5',
  CC :'6799',
  CH :'8450',
  CL :'4221076',
  CN :'033329',
  CO :'821569',
  CR :'06334',
  CU :'CP21827',
  CV :'6194',
  CX :'6798',
  CY :'3775',
  CZ :'48441',
  DE :'23185',
  DK :'7932',
  DO :'56826',
  DZ :'00401',
  EC :'534985',
  EE :'84339',
  EG :'84789',
  ES :'47462',
  ET :'3103',
  FI :'82707',
  FK :'FIQQ 1ZZ',
  FM :'96946',
  FO :'251',
  FR :'52120',
  GB :'GIR 0AA',
  GE :'3338',
  GG :'GYK3Y 2WW',
  GI :'GX11 1AA',
  GL :'3913',
  GN :'294',
  GR :'781 75',
  GS :'SIQQ 1ZZ',
  GT :'90983',
  GU :'96910-2072',
  GW :'5369',
  HK :'999077',
  HM :'7151',
  HN :'19213',
  HR :'42203',
  HT :'HT5345',
  HU :'1247',
  ID :'94648',
  IL :'1408220',
  IM :'IMQ5X 2LJ',
  IN :'395622',
  IO :'BB9D 1ZZ',
  IQ :'49485',
  IR :'2322454067',
  IS :'746',
  IT :'09935',
  JE :'JE2 4JP',
  JM :'JMXDC38',
  JO :'21090',
  JP :'828-0234',
  KE :'95284',
  KG :'408145',
  KH :'948359',
  KI :'KI7528',
  KN :'KN5553-4977',
  KR :'66965',
  KW :'40748',
  KY :'KY9-1311',
  KZ :'823330',
  LA :'01389',
  LB :'3755 5614',
  LC :'LC43  052',
  LI :'0234',
  LK :'41218',
  LR :'6496',
  LS :'826',
  LT :'63020',
  LU :'L-3089',
  LV :'LV-2150',
  MA :'18046',
  MD :'6791',
  ME :'42279',
  MG :'863',
  MH :'96967',
  MK :'1050',
  MM :'67787',
  MN :'80986',
  MP :'96954',
  MS :'MSR9087',
  MT :'JI 42',
  MU :'I1027',
  MV :'80944',
  MW :'606397',
  MX :'75170',
  MY :'46532',
  MZ :'7821',
  NA :'68556',
  NC :'98823',
  NE :'5186',
  NF :'2899',
  NG :'728404',
  NI :'17633',
  NL :'2397 CZ',
  NO :'8587',
  NP :'69126',
  NR :'NRU68',
  NU :'9974',
  NZ :'5470',
  OM :'015',
  PA :'5089',
  PE :'17113',
  PF :'98775',
  PG :'867',
  PH :'1892',
  PK :'18575',
  PL :'79-166',
  PN :'PCR9 1ZZ',
  PS :'295-046',
  PT :'8274-695',
  PW :'96940',
  PY :'0962',
  RO :'203911',
  RS :'37935',
  RU :'517501',
  SA :'39607-9906',
  SD :'55945',
  SE :'625 97',
  SG :'030058',
  SH :'TDCU 1ZZ',
  SI :'5079',
  SK :'810 37',
  SM :'47899',
  SN :'61797',
  SS :'20594',
  SV :'5989',
  SZ :'W676',
  TC :'TKCA 1ZZ',
  TH :'74198',
  TJ :'736031',
  TM :'739879',
  TN :'8564',
  TR :'08447',
  TT :'202784',
  TW :'665',
  TZ :'40817',
  UA :'65304',
  US :'01425',
  UY :'79084',
  UZ :'881349',
  VA :'00120',
  VC :'VC5596',
  VE :'7120',
  VG :'VG1100',
  VI :'00805-3656',
  VN :'300587',
  WF :'98686',
  WS :'WS2394',
  ZA :'3801',
  ZM :'99657',
}
export const COMMON_POSTCODE_REGEX = /^.{1,50}$/
export const COMMON_POSTCODE_EXAMPLE = 'AABB1234'
