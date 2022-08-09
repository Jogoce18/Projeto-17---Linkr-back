CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
   id SERIAL PRIMARY KEY,
   token TEXT NOT NULL UNIQUE,
   "userId" INTEGER NOT NULL REFERENCES users(id),
   "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  link TEXT NOT NULL,
  article TEXT NOT NULL,
  "userId" INTEGER REFERENCES users(id),
  "createdAt" TIMESTAMP DEFAULT NOW()
);
CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  "postId"INTEGER REFERENCES posts(id),
  "userId" INTEGER REFERENCES users(id),
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE postHashtags (
  id SERIAL PRIMARY KEY,
  "hashtagsId"INTEGER REFERENCES hashtags(id),
  "postId"INTEGER REFERENCES posts(id),
  "createdAt" TIMESTAMP DEFAULT NOW()
);
CREATE TABLE likes(
  id SERIAL PRIMARY KEY,
  countLikes  INTEGER NOT NULL DEFAULT 0,
  "postId"INTEGER REFERENCES posts(id),
  "userId" INTEGER REFERENCES users(id),
  "createdAt" TIMESTAMP DEFAULT NOW()
);