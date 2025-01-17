/**
 * @param {NS} ns
 **/
export async function main(ns) {
  var target = ns.args[0]
  var toHack = ns.args[1]

  // copy the get-money script to the target
  var script = "get-money.script"
  ns.scp(script, "home", target);
  whisper(ns, loud, "Copied " + script + " to " + target)

  // calculate the threads we can use for running our script
  var ramRequired = ns.getScriptRam(script);
  var availableRam = ns.getServerMaxRam(target) - ns.getServerUsedRam(target);
  whisper(ns, loud, "" + target + " has " + availableRam + " ram available to use")
  var threads = Math.min(50, Math.floor(availableRam / ramRequired))

  if (threads < 1) {
    whisper(ns, loud, "No ram available")
    exit()
  }

  whisper(ns, loud, "Using " + threads + " threads")

  var pid = ns.exec(script, target, threads, toHack, loud);
  whisper(ns, loud, "Running script on " + target + " with PID " + pid)
}
