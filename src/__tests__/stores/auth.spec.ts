import { setActivePinia, createPinia } from 'pinia'
import { expect, test, beforeEach, vi } from 'vitest'
import { useAuthStore } from '@/stores/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

vi.mock('firebase/auth')

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Should set user after register', async () => {
  const store = useAuthStore()
  const userMock = {
    email: 'test@test.pl',
    password: 'password'
  }

  vi.mocked(createUserWithEmailAndPassword).mockResolvedValue({
    user: userMock
  } as any)

  await store.register(userMock.email, userMock.password)

  expect(store.user).toStrictEqual(userMock)
})

test('Should throw on register error', async () => {
  const store = useAuthStore()
  vi.mocked(createUserWithEmailAndPassword).mockRejectedValue(new FirebaseError('test', 'test'))

  try {
    await store.register('test@test.pl', 'password')
  } catch (error) {
    expect(error).toStrictEqual(new Error("test"))
  }

  expect(store.user).toBeNull();
})

test('Should set user after login', async () => {
  const store = useAuthStore()
  const userMock = {
    email: 'test@test.pl',
    password: 'password'
  }

  vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
    user: userMock
  } as any)

  await store.logIn(userMock.email, userMock.password)
  expect(store.user).toStrictEqual(userMock)
})

test('Should throw on login error', async () => {
  const store = useAuthStore()
  vi.mocked(signInWithEmailAndPassword).mockRejectedValue(new FirebaseError('test', 'test'))

  try {
    await store.logIn('test@test.pl', 'password')
  } catch (error) {
    expect(error).toStrictEqual(new Error("test"))
  }

  expect(store.user).toBeNull();
})

test('Should remove user after logOut', async () => {
  const store = useAuthStore()

  vi.mocked(signOut).mockResolvedValue()

  await store.logOut()

  expect(store.user).toBeNull();
})
