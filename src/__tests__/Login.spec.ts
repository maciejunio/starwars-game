import { mount } from '@vue/test-utils'
import { expect, test, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Login from '../views/Login.vue'
import { setActivePinia, createPinia } from 'pinia'
import { router } from '@/router/router'

const vuetify = createVuetify({
  components,
  directives
})

beforeEach(() => {
  setActivePinia(createPinia())
})

test('should render form elements', async () => {
  const wrapper = mount(Login, {
    props: {},
    global: {
      plugins: [vuetify, router]
    }
  })

  expect(wrapper.find('#email-input').isVisible()).toBe(true)
  expect(wrapper.find('#password-input').isVisible()).toBe(true)
  expect(wrapper.find('#submitBtn').isVisible()).toBe(true)
})

test('disables submit button when email and password are not provided', async () => {
  const wrapper = mount(Login, {
    props: {},
    data() {
      
    },
    global: {
      plugins: [vuetify, router]
    }
  })
  expect(wrapper.find('#submitBtn').attributes().disabled).toBeDefined()
})

test('enable submit button when email and password are provided', async () => {
  const wrapper = mount(Login, {
    props: {},
    global: {
      plugins: [vuetify, router]
    }, 
  })
  await wrapper.find('#email-input').setValue("test@test.pl");
  await wrapper.find('#password-input').setValue("password123")
  expect(wrapper.find('#submitBtn').attributes().disabled).toBe(undefined)
})
