import config from '../../modules/config'

export default {
  endpoint: { label: 'AVA Network Official', value: config.athNetwork },
  language: 'en',
  coins: config.coins,
  action: '',
  myCoins: config.coins.reduce((res, c) => {
    res[c.abb] = false
    return res
  }, {})
}
