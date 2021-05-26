let express = require( 'express' );
let app = express(); 

//https server
let fs = require('fs');
let privateKey  = fs.readFileSync('key.pem', 'utf8');
let certificate = fs.readFileSync('cert.pem', 'utf8');
let credentials = {key: privateKey, cert: certificate};
let server = require('https').createServer(credentials, app);

let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/create', ( req, res ) => {
   res.sendFile( __dirname + '/index.html' );
} );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/login.html' );
 } );

io.of( '/stream' ).on( 'connection', stream );

server.listen( 3000 );
