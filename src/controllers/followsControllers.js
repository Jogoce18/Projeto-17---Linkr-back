import { followerRepository } from "../repositories/followsRepository.js";

export async function verifyIfUserFollowsAnotherUser(req, res) {
  const { userId, followerId } = req.params;
  const { rows: dbFollows } = await followerRepository.selectFollowByIds(
    userId,
    followerId
  );

  res.status(200).send(dbFollows);
}

export async function deleteFollow(req, res) {
  const { userId, followerId } = req.params;

  try {
    await followerRepository.deleteFollow(userId, followerId);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function createFollow(req, res) {
  const { userId, followerId } = req.params;

  try {
    await followerRepository.insertFollow(userId, followerId);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getUserFollowers(req, res) {
  const id = parseInt(req.params.id);
  try {
    const { rows: dbFollowers } = await followerRepository.getUserFollowers(id);
    res.status(200).send(dbFollowers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
