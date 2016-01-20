'use strict';

var restify = require('restify'),
  logger = require('./utilities/logger'),
  errors = require('./utilities/errors'),
  metrics = require('./utilities/metrics')(logger),
  healthcheck = require('./healthcheck'),
  sample = require('./sample'),
  app = restify.createServer({
    log: logger
  });

app.use(restify.bodyParser());
app.use(restify.queryParser());
app.use(restify.requestLogger({}));
app.on('after', restify.auditLogger({ log: logger, body: true }));
app.on('after', metrics.requestCounter);
app.on('after', metrics.requestTime);
app.on('after', metrics.requestStatus);
app.on('InternalServer', errors.error);
app.on('BadRequest', errors.warn);
app.on('NotAcceptable', errors.warn);
app.on('NotFound', errors.warn);
app.on('uncaughtException', errors.uncaught);

app.get('/_healthcheck', healthcheck);
app.post('/sample', sample);
app.get('/', function(req, res) {
    var body = '<canvas id=c><script>a=c.getContext("2d");S=String.fromCharCode;T=[Q=Math.cos,c.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%",A=Date.now()/1024];setInterval(function u(v,w,x,y){if(v){if(x){a.beginPath();a.moveTo(v.x,v.y),a.lineTo(w.x,w.y),(x.x?(a.lineTo(x.x,x.y),a.lineTo(y.x,y.y)):(a.lineTo(w.x,w.y+x*w.p),a.lineTo(v.x,v.y+x*v.p),a.fillStyle=c[y]));a.fill()}return w.z-v.z}c.width=w=768;c.height=h=w*innerHeight/innerWidth|0;o=h*2/3;O=Date.now()/1024-A;e=O/12;Z=128*Q(e/2+11)-256;T.sort(u);a.rotate((O/17&13)/32-.2);v={x:-w,y:o,p:1};s={x:w*2,y:o,p:1};for(i=0;i<32;i++){y=Math.max(0,h*256/(Z+i*128));u(v,s,y/2,i*8+2);u(v,s,-y,i*8+3);}a.fillStyle=c[w];a.font="bold 20px a";a.fillText("M A K E    P H A T    S T A C K S",(w/2+8)-100,o-128);a.font="bold 128px a";a.fillText("$$$",(w/2)-98,o-16);for(i=0;i<1024;i++){k=i/2&3;j=(i/4&-1)+(i&1)*32;M=j-k*16+32*Q(e)|0;j=j-k*64*Q(e)|0;c[i]="rgb("+[j+=M,j+=M,j+=M]+")";v=T[i];if(v&&v.z>16&&v.k<256){y=-16*Q(e/4)-24;s=v.k?8-2*Q(v.i):11;H=v.k?Math.max(2,11-v.k/8-4*Q(s-v.k))+(s-v.k&1):32;k=i;for(j=0;j<H;j++){y+=4;a.globalAlpha=1-v.k/(128+j*64);C=Q(e);D=Q(e+11);for(i=0;i<5;i++){x=i&2?s:-s;z=1+i&2?s:-s;p=256/(v.z+z*C-x*D);T[i]={p:p,x:w/3+p*(v.x+z*D+x*C),y:o-p*y};if(i&&T[i].x<t.x){u(T[i],t,4,j*8+i*2);u(T[i],t,1,j*8+i*2+1);}t=T[i]}e+=v.k?0:Q(Math.max(0,O/17-1)+11)/6}i=k;e=O/12;if(y<0)u.apply(T,T)}C=Q(e);D=Q(e+11);x=(i&31)-16;z=(i>>5)-16;T[i]={i:i,k:x*x+z*z,z:24*(z*C-x*D)-Z,x:24*(z*D+x*C)}}},1)</script>';

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/html'
    });
    res.write(body);
    res.end();
});
module.exports = app;
