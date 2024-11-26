import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
function moneyFmt(){
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 1,
    notation: 'compact'
  })
}
export default boot(async ({app}) => {
  app.directive('money', {
    mounted(el, binding){
      const val = moneyFmt().format(binding.value)
      el.innerText = val
    },
    updated(el, binding){
      const val = moneyFmt().format(binding.value)
      el.innerText = val
    }
  })
})
