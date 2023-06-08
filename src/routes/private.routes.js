import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Success! You can now see this without a token.');
});

export default router;