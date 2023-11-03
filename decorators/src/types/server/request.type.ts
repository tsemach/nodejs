import express from 'express';

export interface Request<T=any> extends express.Request {}