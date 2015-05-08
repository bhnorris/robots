
//FightCode can only understand your robot
//if its class is called Robot
var Robot = function(robot) {
     robot.clone();
     robot.turn(45);
     this.offset = 1; 
     this.offset1 = 0;
};

Robot.prototype.onIdle = function(ev) {
    var robot = ev.robot;
  if (robot.parentId != null) {
    robot.turn(-1);
    this.offset = robot.life;
    return;
  }
  if (this.offset < 20 || this.offset1 > 300) {
    robot.turn(1);
    return;
  }
    robot.turn(1);
    robot.ahead(1);
    this.offset1++;
};

Robot.prototype.onScannedRobot = function(ev) {
    var robot = ev.robot, scannedRobot = ev.scannedRobot;
    if (robot.id == scannedRobot.parentId || robot.parentId == scannedRobot.id) {
       return;
    } 
    robot.stop();
     for (var i=0; i < 10; i++) {
        robot.fire();
        robot.ahead(10);
     } 
};

Robot.prototype.onRobotCollision = function(ev) {
    var robot = ev.robot, collidedRobot = ev.collidedRobot;
    if (robot.id == collidedRobot.parentId || robot.parentId == collidedRobot.id) {
       robot.back(20);
       robot.turn(10);
       return;
    } 
    robot.fire(); // trying to run away
    robot.back(20);
};

Robot.prototype.onWallCollision = function(ev) {
    var robot = ev.robot;
    robot.stop();
    robot.turn(10); // turn enought to be in a straight
    robot.ahead(10);                     // angle with the wall.
};

Robot.prototype.onHitByBullet = function(ev) {
    var robot = ev.robot;
    robot.turn(ev.bearing); // Turn to wherever the bullet was fired
    robot.ahead(10);                        // so we can see who shot it
};
