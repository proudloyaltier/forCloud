'use strict'

firebase.initializeApp({
  apiKey: 'AIzaSyD49Jo0eeB0Y38J3GtN3AaavYU_8Q7cHqQ',
  authDomain: 'forcloudapp.firebaseapp.com',
  databaseURL: 'https://forcloudapp.firebaseio.com',
  projectId: 'forcloudapp',
  storageBucket: 'forcloudapp.appspot.com',
  messagingSenderId: '621514392136',
  appId: '1:621514392136:web:c1e7c3141dace447'
})

const forCloud = {}

{
  // Classes.

  class User {
    #username
    #data

    constructor (username, data) {
      this.#username = username
      this.#data = data
    }

    get username () {
      return this.#username
    }

    get data () {
      return this.#data
    }

    changePassword (newPassword) {
      // TODO
    }
  }

  // Element functions.

  function $ (id) {
    return document.getElementById(id)
  }

  function $$ (selector) {
    return document.querySelector(selector)
  }

  // Storage functions.

  function get (name) {
    return JSON.parse(localStorage.getItem(`forCloudStorage_${name}`))
  }

  function store (name, value) {
    localStorage.setItem(`forCloudStorage_${name}`, JSON.stringify(value))

    return value
  }

  // Account functions.

  async function signIn (username, password) {
    return firebase.auth().signInWithEmailAndPassword(stringifyUsername(username), password)
  }

  async function signOut () {
    return firebase.auth().signOut()
  }

  async function signUp (username, password) {
    // TODO
  }

  function stringifyUsername (username) {
    return `${username}@forcloud.app`
  }

  function parseEmail (email) {
    return email.replace('@forcloud.app', '')
  }

  // Misc. functions.

  function encrypt(content) {
    return CryptoJS.AES.encrypt(content, firebase.auth().currentUser.uid) + ""
  }

  function decrypt(content) {
    return CryptoJS.AES.decrypt(content, firebase.auth().currentUser.uid).toString(CryptoJS.enc.Utf8);
  }

  async function selectFile () {
    const selector = document.createElement('input')

    selector.type = 'file'

    const promise = new Promise(resolve => {
      selector.addEventListener('change', event => {
        resolve(event.target.files)
      })
    })

    selector.click()

    return promise
  }

  async function pickColor () {
    const picker = document.createElement('input')

    picker.type = 'color'

    const promise = new Promise(resolve => {
      picker.addEventListener('change', event => {
        resolve(event.target.value)
      })
    })

    picker.click()

    return promise
  }

  forCloud.User = User

  window.$ = $
  window.$$ = $$

  forCloud.get = get
  forCloud.store = store
  forCloud.encrypt = encrypt
  forCloud.decrypt = decrypt

  forCloud.signIn = signIn
  forCloud.signOut = signOut
  forCloud.signUp = signUp
  forCloud.stringifyUsername = stringifyUsername
  forCloud.parseEmail = parseEmail

  forCloud.selectFile = selectFile
  forCloud.pickColor = pickColor
}