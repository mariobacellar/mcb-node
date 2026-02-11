import {adsFlamengo} from './ads-flamengo.js'
import {adsGlobal} from './ads-global.js'


export default (req, res) => {

    let _id = req.query.id;

    let _result = adsGlobal;

    if (_id =='flamengo')
      _result =  adsFlamengo;

    res.status(200).json(_result)
}

/*
https://jsonformatter.curiousconcept.com/#

http://localhost:3000/api/ads

http://localhost:3000/api/ads?id=flamengo

http://localhost:3000/api/flamengo

http://localhost:3000/api/global

https://mockapi.io/projects/60ba729442e1d0001761fb21





*/