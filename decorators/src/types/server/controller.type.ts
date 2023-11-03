import * as express from 'express'

export interface Controller {
  add(exporess?: express.Application): express.Handler
}