import { networkMap } from 'Network.js'
import { groupBy } from 'groupBy.js'
import { BestHack } from 'BestHack.js'

export async function main(ns) {
  let nMap = networkMap(ns)
  let crackers = [0, "BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "sqlinject.exe"]
  let targets = ["n00dles", "foodnstuff", "sigma-cosmetics", "hong-fang-tea", "harakiri-sushi", "iron-gym"]

  const serversByPortsRequired = groupBy(Object.values(nMap.serverData), (s) => s.portsRequired)
  const searcher = new BestHack(nMap.serverData)
  ns.tprint(searcher.findBestPerLevel(ns.getHackingLevel()))

  for (let i = 0; i < crackers.length; i++) {
    if (i > 0) {
      do {
        await ns.sleep(10000)
      } while (!ns.fileExists(crackers[i], 'home'));
    }

    ns.tprint("Zombifying level " + i + " servers, targeting " + targets[i])
    for (const server of serversByPortsRequired[i]) {
      if (server.name !== 'home') {
        zombify(ns, server, targets[i])
        await ns.sleep(400)
      }
    }
  }
  ns.tprint("Botnet.ns completed running.")
}

function zombify(ns, serv, target) {
  let pid = ns.run("zombie-server.script", 1, serv.name, target, 0)
  ns.tprint("Zombifying " + serv.name + " with PID " + pid)
}