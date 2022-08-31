/**
 * 配置文件
 */
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const jsonplus = require('jsonplus');
const cors = require('koa2-cors'); // 跨域
const json = require('koa-json');
const onerror = require('koa-onerror'); // 错误处理
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger'); // 终端显示日志
const requireDirectory = require('require-directory'); // 动态路由
const proxy = require('koa2-proxy-middleware'); // 代理
const mysql = require('mysql'); // 数据库
const log4js = require('koa-log4'); // 输出日志文件
const multer = require('koa-multer'); //加载koa-multer模块
const jwt = require('jsonwebtoken'); // token
const koa_jwt = require('koa-jwt'); // 验证传过来的token
const captcha = require('svg-captcha'); // 验证码模块
const AipOcrClient = require('baidu-aip-sdk').ocr; // 百度OCR
const tencentcloud = require('tencentcloud-sdk-nodejs'); // 腾讯OCR

module.exports = {app, router, Router, fs, path, jsonplus, json, cors, onerror, bodyparser, logger, requireDirectory, proxy, mysql, log4js, multer, jwt, koa_jwt, captcha, AipOcrClient, tencentcloud};
