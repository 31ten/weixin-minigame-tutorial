import objects, {initObjects} from '../objects'
import state, {initState} from '../state'
import GameButton from '../objects/Button/Button'

import {displayLeaderboard} from './leaderboard'
import {getUserInfos} from './wechat'
import {saveUserScore, createFakeUsers} from './db'

export const endGame = (game) => {
  game.paused = true

  // displaying the menu
  objects.buttonRestart = new GameButton({game:game, position:{x:0, y: -300}, onClick: () => restartGame(game), name:'restart' })
  objects.buttonRestart.create()

  objects.buttonLeaderboard = new GameButton({game:game, position:{x:0, y: -200}, onClick: () => openLeaderboard(game), name:'leaderboard' })
  objects.buttonLeaderboard.create()

  // recording score in db
  getUserInfos(infos => {
    saveUserScore(infos, state.score, () => {
      createFakeUsers()
    })
  })
}

export const restartGame = (game) => {
  game.paused = false
  initObjects()
  initState()
  game.state.restart(true, true)
  state.gameState = 'started'
}

export const openLeaderboard = (game) => {
  console.log('openLeaderBoard')
  objects.textLoading = game.add.text(16, 50, `getting best scores...`, { fontSize: '32px', fill: '#ff0000' });
  displayLeaderboard(game, () => {
    objects.textLoading.text = ``
  })
}
