const express = require("express")
const {handleGenerateNewShortUrl, handleGetAnalytics} = require("../controllers/url")
const router  = express.Router();

router.post('/', handleGenerateNewShortUrl); // '/url' gets converted to '/'
router.get('/analytics/:shortId',handleGetAnalytics )


module.exports= router;