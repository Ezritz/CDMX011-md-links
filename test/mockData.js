const mockLinks = [
    {
        href: 'www.google.com',
        text: 'Google',
        file: './test/mock.md',
    },
    {
        href: 'https://stackoverflow.com/questions/43892252/how-do-i-restrict-my-last-character-using-regex',
        text: 'stackoverflow',
        file: './test/mock.md',
        
    },
    {
        href: 'https://nodejs.org/en/',
        text: 'Node',
        file: './test/mock.md',
    },
    {
        href: 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday',
        text: 'Mock Fetch',
        file: './test/mock.md',
    },

]
let statDefault = {
    Total: 4,
    Unique: 4,
}
let linkOk = {
    href: 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday',
}
let linkFail = {
    href: 'www.google.com',
}
let responseOk = {
    href: '[https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday',
    text: 'Mock Fetch',
    ok: 'ok',
}
let responseFail = {
    href: 'www.google.com',
    text: 'Google',
    ok: 'fail',
}
let linksToValidate = [
    {
        href: 'https://www.youtube.com/watch?v=mHXhuPHiDj8&ab_channel=LeighHalliday',
        text: 'Mock Fetch',
        file: './test/mock.md',
    },
    {
        href: 'www.google.com',
        text: 'Google',
        file: './test/mock.md',
    }

]
let validateLinks = {
    Total: 2,
    Unique: 2,
    Broken: 1,
}
module.exports = {
    mockLinks, 
    statDefault, 
    linkOk, 
    linkFail, 
    responseOk, 
    responseFail, 
    linksToValidate, 
    validateLinks,
}

