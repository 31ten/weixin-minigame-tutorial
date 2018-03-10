import {birdJSON} from '../../../../images/bird'
import state from '../../state'

import {collisionWithBorders} from '../../managers/collisions'

class Bird  {
  constructor(game) {
    this.game = game
    this.object = {}
  }

  static preload(game) {
    let json = JSON.parse(birdJSON)
    // import
    game.load.atlasJSONHash('bird', 'images/bird.png', null, json);
    // game.load.image('bird', 'images/pipe-top.png')
  }

  create() {
    this.object = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'bird')
    this.object.anchor.setTo(0.5, 0.5);
    this.object.scale.setTo(1, 1);

    this.object.animations.add('fly');
    this.object.animations.play('fly', 3, true);

    this.game.physics.enable(this.object, Phaser.Physics.ARCADE)
    this.object.body.allowGravity = true

    this.game.input.onDown.add(this.jump.bind(this))
  }

  jump() {
    this.object.body.velocity.y -= state.gravityJump
  }

  update() {
    if (this.object.body.position.y > this.game.world.height - 300) collisionWithBorders(this.object)
    if (this.object.body.position.y < 0) collisionWithBorders(this.object)
  }
}

export default Bird
