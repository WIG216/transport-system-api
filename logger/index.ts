
/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: Bato API
 * This is a default file description
 * Created on Mod Jan 23 2023
 */

import { Logger } from "tslog";


 const log: Logger = new Logger({ name: "Logs" });

/**
 * 
 * use as a global logger

 *  @return log method
 */

function logger() {
  return log
}

export default  logger() 



