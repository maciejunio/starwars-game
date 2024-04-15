import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Login from '../views/Login.vue'
import { createTestingPinia } from '@pinia/testing'
import { router } from '@/router/router'

const vuetify = createVuetify({
  components,
  directives
})

test('should render form elements', async () => {
  const wrapper = mount(Login, {
    props: {},
    global: {
      plugins: [vuetify, createTestingPinia(), router]
    }
  })

  expect(wrapper.find('#email-input').isVisible()).toBe(true)
  expect(wrapper.find('#password-input').isVisible()).toBe(true)
  expect(wrapper.find('#submitBtn').isVisible()).toBe(true)
})

