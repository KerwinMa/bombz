//// IMPORTS
var Map = require( './Map' );
var Room = require( './Room' );
var Bomb = require( './Bomb' );
var Powerup = require( './Powerup' );


function RoomPlaying( room )
{
  this._room = room;


//// PRIVATE VARIABLES

  // game related
  // this._map;
  // this._time;
  // this._pending_powerups; // Powerup.Type[], list of available powerups server has yet to give out , start with full list here
}


//// PUBLIC FUNCTIONS

// creates listeners specific to this state for a player
RoomPlaying.prototype.CreatePlayerListeners = function( player )
{
  var socket = player.GetSocket();

  // player moves
  socket.on( 'move', function( data )
  {
    console.log( 'onMove' );
  });

  // player plants a bomb
  socket.on( 'bomb', function( data )
  {
    console.log( 'onBomb' );
    // set timer till bomb explodes and check again
  });

  // player shoots a fireball
  socket.on( 'fireball', function( data )
  {
    console.log( 'onFireball' );
  });

  // player kicks a bomb
  socket.on( 'kickbomb', function( data )
  {
    // CHECK If PLAYER HAS ABILITY
    console.log( 'onKickBomb' );
  });
}

// removes listeners specific to this state for a player
RoomPlaying.prototype.RemovePlayerListeners = function( player )
{
  var socket = player.GetSocket();
  socket.removeAllListeners( 'move' );
  socket.removeAllListeners( 'bomb' );
  socket.removeAllListeners( 'fireball' );
  socket.removeAllListeners( 'kickbomb' );
}

//// STATE PATTERN FUNCTIONS

// entering state
// start listening for events
RoomPlaying.prototype.Enter = function()
{
  for ( var index in this._room._players )
    this.CreatePlayerListeners( this._room._players[ index ] );
}

// leaving state
// stop listening for events
RoomPlaying.prototype.Leave = function()
{
  for ( var index in this._room._players )
    this.RemovePlayerListeners( this._room._players[ index ] );
}

// add player to room
// shouldn't happen in this state as player can't be added while game is on
RoomPlaying.prototype.AddPlayer = function( player ) {}

// remove player from room
// this is called when player leaves / disconnects
RoomPlaying.prototype.RemovePlayer = function( player )
{
  var index = this._room._players.indexOf( player );

  if ( _this.room._players.length < 1 || index  == -1 )
    return;

  this._room._players.splice( index, 1 );

  // DO SOMETHING

  // check for any winners!
}

// update according to a bomb explosion
RoomPlaying.prototype.BombExplode = function( bomb )
{

}

// representation
// not required in this state
RoomPlaying.prototype.Serialize = function() {};


//// EXPORTS
module.exports = RoomPlaying;