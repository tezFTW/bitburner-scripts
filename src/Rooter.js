import { Whisperer } from 'Whisperer.js'

export function Rooter(ns, logger) {
  this.ns = ns
  this.logger = logger
}

Rooter.prototype.root = function(target) {
  if (this.ns.hasRootAccess(target)) {
    this.logger.say("Have root access already");
    return;
  }

  if (this.ns.fileExists("BruteSSH.exe", "home")) {
    this.ns.brutessh(target)
    this.logger.say("Broke SSH port")
  }
  if (this.ns.fileExists("FTPCrack.exe", "home")) {
    this.ns.ftpcrack(target)
    this.logger.say("Broke FTP port")
  }
  if (this.ns.fileExists("HTTPWorm.exe", "home")) {
    this.ns.httpworm(target)
    this.logger.say("HTTPWorm-ed port")
  }
  if (this.ns.fileExists("relaySMTP.exe", "home")) {
    this.ns.relaysmtp(target)
    this.logger.say("Broke SMTP port")
  }
  if (this.ns.fileExists("sqlinject.exe", "home")) {
    this.ns.sqlinject(target)
    this.logger.say("Broke SQL port")
  }

  var ret = this.ns.nuke(target)
  this.logger.say("Sudo aquired: " + ret)
}

export function main(ns) {
  var target = ns.args[0]
  var loud = ns.args[1] === undefined ? 1 : ns.args[1]
  const whisperer = new Whisperer(ns, loud)
  const rooter = new Rooter(ns, whisperer)
  rooter.root(target)
}