import { validatePassFormat } from './../../../src/utils/commons'

test('test with valid password, should return true', () => {
    expect(validatePassFormat({ password: 'Aa2@bbhh__'})).toBeTruthy()
})

test('test with not valid password, should return false', () => {
    expect(validatePassFormat({ password: 'Aa@bbhh__'})).not.toBeTruthy()
})

test('test with null | undefined, should return false', () => {
    expect(validatePassFormat({ password: null })).not.toBeTruthy()
    expect(validatePassFormat({ password: undefined })).not.toBeTruthy()
})