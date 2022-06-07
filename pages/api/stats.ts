import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from '../../helper';
import { findVideoIdByUser, insertStats, updateStats } from '../../lib/hasura_db';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST") {
        try {
            
            const token = req.cookies.token;
            // console.log("cookie => ", token);
            if (!token) {
            res.status(403).send({});
            } else {
                const inputParams = req.method === "POST" ? req.body : req.query;
                const { videoId, videoType } = inputParams;
                if(videoId){
                    const userId = await verifyToken(token);
                    const findVideo = await findVideoIdByUser(token, userId, videoId, videoType);
                    const doesStatsExist = findVideo?.length > 0;

                    if (req.method === "POST") {
                       
                        const { favourited, watched = true } = req.body;
                        if (doesStatsExist) {
                            // update it
                           
                            const response = await updateStats(token, {
                            watched,
                            userId,
                            videoId,
                            videoType,
                            favourited,
                            });
                            res.send({ data: response });
                        } else {
                            // add it
                            
                            const response = await insertStats(token, {
                            watched,
                            userId,
                            videoId,
                            videoType,
                            favourited,
                            });
                            res.send({ data: response });
                        }
                    } else {
                         if (doesStatsExist) {
                            res.send(findVideo);
                        } else {
                            res.status(404);
                            res.send({ user: null, msg: "Video not found" });
                        }
                    }
                }
            } 
            
        } catch (error) {
            res.status(500).send({ done: false, error: error?.message });
        }
    } else {
        res.status(500).send({done: "false2"});
    }
}