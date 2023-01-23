/*
 * Author: Cliff
 * Contributors: 
 *
 * Project: 
 * This is used to boot up our API
 * Created on Monday jan 23 2023

 */

import mongoose = require('mongoose');
import logger from '../logger/index'

let options = {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false

}
let startMongo = () => {
  mongoose.connect('mongodb+srv://EnthCliff:transport-system@cluster0.lpd9b0o.mongodb.net/?retryWrites=true&w=majority',options);
  const connection = mongoose.connection;
    return connection;
}

export default startMongo;