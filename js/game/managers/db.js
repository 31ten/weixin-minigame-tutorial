import AV from '../../libs/av-weapp'
import {each, isObject} from '../../libs/lodash'

AV.init({
 appId: 'QyNXyhk2rss5mu96NqgBMRSi-gzGzoHsz',
 appKey: 'vvxe9iLyeQcQOUMKdkWGG9Y9'
})

export const saveUserScore = (infos, score, callback) => {
  infos.score = score
  getUser(infos.openid, user => {
    if (!isObject(user)) createNewUser(infos, callback)
    else if (user.attributes.score < infos.score) setUserScore(user, infos.score, callback)
    else callback()
  })
}

export const getUser = (openid, callback) => {
  console.log('=> getUser')
  let query = new AV.Query('Players');
  query.equalTo('openid', openid)
  query.first().then(user => {
      callback(user)
   })
}

export const getAllUsers = (callback) => {
  console.log('=> getAllUsers')
  let query = new AV.Query('Players');
  query.find().then(users => {
     let formattedUsers = []
     each(users, user => formattedUsers.push(user.attributes))
     callback(formattedUsers)
   })
}

export const createNewUser = (infos, callback) => {
  console.log('=> createNewUser')
  let Player = AV.Object.extend('Players')
  let player = new Player()
  player.set({
    'openid': infos.openid,
    'name': infos.name,
    'score': infos.score,
    'picture': infos.picture
  })
  player.save().then(e => {
    callback(e)
  })
}

export const setUserScore = (user, score, callback) => {
  // console.log('=> setUserScore', user)
  user.set('score', score)
  user.save().then(e => {
    console.log('=> setUserScore success',user.attributes.name, score)
    callback(e)
  })
}

export const createFakeUsers = () => {
  console.log('hydrating')
  saveUserScore({
    name: 'Jack Ma',
    picture: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTInShcaY9KZ8ISG7pt9Pgt8rUuHlFMNAaBichHq3vFMGLwEmNLYlxNibNRC2n8I9xGbVSMOSaBuTGFA/0",
    openid: 'AAAAAA32321cahsadkfjhadgfa123133123',
  }, 3)

  saveUserScore({
    name: 'Ma Huateng',
    picture: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTInShcaY9KZ8ISG7pt9Pgt8rUuHlFMNAaBichHq3vFMGLwEmNLYlxNibNRC2n8I9xGbVSMOSaBuTGFA/0",
    openid: '2SSSSS3223dsaffsadkfjhadgfa123133123',
  }, 5)
}
