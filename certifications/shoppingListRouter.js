var recipes = require('../recipes.json');
var router = require('express').Router();

const hash = {}
recipes.forEach(r => hash[r.id] = r.ingredients)

router.get('/shopping-list', function (req, res, next) {
  let ids = req.query.ids
  if (!ids) res.sendStatus(400)
  else {

    const list = []
    ids = ids.split(',')


    for (id of ids) {
      if (hash[+id]) list.push(...hash[+id])
    }

    if (list.length) res.json(list)
    else res.status(404).send('NOT_FOUND')
  }
});

module.exports = router;

