export default function auth ({ store, next }) {
  if (!store.getters['auth/user'].subscribed) {
    return next({
      name: 'home'
    })
  }

  return next()
}