import express from 'express';

export interface Response<T=any> extends express.Response {}