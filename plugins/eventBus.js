import Vue from 'vue'
export const eventBus = new Vue()
export default function ({ app }, inject) {
  // this is the same as Vue.prototype.$eventBus = new Vue()
  // inject('eentBus', new Vue());
  // Client only
  if (process.client) {
    // Event bus for piugins
    inject('eventBus', eventBus)
  }
}
