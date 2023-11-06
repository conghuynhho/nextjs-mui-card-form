export const validEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
/* validPassword:
    password >= 6 letters
    password must be only letter and numbers
    password is Case Sensitive (has at least 1 capital letter)
*/
// eslint-disable-next-line no-useless-escape
export const validPassword = new RegExp(/^((?=.*[a-z])|(?=.*[A-Z]))(?=.*\d)[A-Za-z\d`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,}$/)
export const PatternName = /^([々]|[぀-ゖ]|[ァ-ン]|[一-龯]|[ヶ])+$/g
export const PatternNameKana = /^(([ァ-ン])|([ぁ-ん]))*$/g
// export const TelCode = new RegExp(/^0(\+\d{1,2}\s)?\(?\d{1,2}\)?[\s.-]?\d{4}[\s.-]?\d{1,4}$/g)
export const auPayload = 'au-payload'

// eslint-disable-next-line no-useless-escape
export const PatternForeignName = /^([^0-9_!¡?÷?¿\\`'+-\/"=@#$%ˆ^&*(){}|~<>;:[\]])+$/
// export const PatternForeignName = /^([^0-9_!¡?÷?¿\\`'+-\\/"=@#$%ˆ^&*(){}|~<>;:[\]])+$/
