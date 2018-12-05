const Game = require('../models/game');

module.exports = {
    createCharacter(req, res, next) {
        const character = req.body;

        Game.findById({ _id: req.params.gameid })
            .then(game => {
                game.characters.push(character);
                return game.save();
            })
            .then(() => res.send(character))
            .catch(next);
    }, 

    editCharacter(req, res, next) {
        // CREATE LATER
    },

    deleteCharacter(req, res, next) {
        Game.findByIdAndUpdate(
            { _id: req.params.gameid },
            { $pull: { characters: { _id: req.params.characterid } } }
        )
        .then(game => res.status(204).send(game))
        .catch(next);
    }
};