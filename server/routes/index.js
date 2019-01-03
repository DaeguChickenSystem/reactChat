import express from 'express';
import account from './account';
// import memo from './memo';
// import post from './post';
// import socketEvents from  'express-fileupload';
const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});

router.use('/account', account);
// router.use('/post', post);


// router.post('/upload', (req, res, next) => {
//   console.log(req);
//   console.log("들어온겨??");
//   let imageFile = req.files.file;
//
//   imageFile.mv(`public/${req.body.filename}.jpg`, function(err) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send(err);
//     }
//
//     res.json({file: `public/${req.body.filename}.jpg`});
//   });
//
// })
export default router;
